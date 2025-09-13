// Enhanced payment service for client's Stripe account
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_CONFIG } from '../config/payment';

// Initialize Stripe
const stripePromise = loadStripe(PAYMENT_CONFIG.stripe.publishableKey);

// Use local server for development, fallback to demo mode for production
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : null;
const DEMO_MODE = !import.meta.env.DEV || !API_BASE_URL;

export interface PaymentIntentData {
  amount: number;
  currency: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    length: string;
  }>;
  shipping: {
    name: string;
    address: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
  clientSecret?: string;
}

// Create payment intent on server
export const createPaymentIntent = async (data: PaymentIntentData): Promise<PaymentResult> => {
  try {
    console.log('Creating payment intent with data:', data);

    // If in demo mode or no server available, simulate payment intent creation
    if (DEMO_MODE || !API_BASE_URL) {
      console.log('Running in demo mode - simulating payment intent creation');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPaymentIntent = {
        client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        payment_intent_id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      return {
        success: true,
        paymentIntent: mockPaymentIntent,
        clientSecret: mockPaymentIntent.client_secret
      };
    }

    const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: data.currency.toLowerCase(),
        customer: data.customer,
        items: data.items,
        metadata: {
          order_id: `order_${Date.now()}`,
          customer_email: data.customer.email,
          customer_name: data.customer.name,
          items_count: data.items.length.toString(),
          total_amount: data.amount.toString(),
          shipping_address: `${data.shipping.address.line1}, ${data.shipping.address.city}, ${data.shipping.address.state} ${data.shipping.address.postal_code}`
        },
        shipping: {
          name: data.shipping.name,
          address: data.shipping.address
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Payment intent created successfully:', result);

    return {
      success: true,
      paymentIntent: result,
      clientSecret: result.client_secret
    };

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment intent'
    };
  }
};

// Confirm payment using Stripe.js with proper error handling
export const confirmStripePayment = async (
  clientSecret: string, 
  paymentMethodData: any
): Promise<PaymentResult> => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    console.log('Confirming payment with client secret:', clientSecret);

    // Use confirmCardPayment instead of confirmPayment for better compatibility
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: paymentMethodData.card,
        billing_details: paymentMethodData.billing_details,
      },
    });

    if (error) {
      console.error('Payment confirmation error:', error);
      throw new Error(error.message || 'Payment confirmation failed');
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment confirmed successfully:', paymentIntent);
      return {
        success: true,
        paymentIntent,
      };
    } else {
      throw new Error(`Payment failed with status: ${paymentIntent?.status || 'unknown'}`);
    }

  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to confirm payment'
    };
  }
};

// Server-side confirmation (optional)
export const confirmPayment = async (paymentIntentId: string): Promise<PaymentResult> => {
  try {
    if (DEMO_MODE || !API_BASE_URL) {
      console.log('Demo mode - simulating payment confirmation');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        paymentIntent: {
          id: paymentIntentId,
          status: 'succeeded'
        }
      };
    }

    const response = await fetch(`${API_BASE_URL}/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_intent_id: paymentIntentId
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to confirm payment');
    }

    const result = await response.json();
    
    return {
      success: result.success,
      paymentIntent: result.payment_intent,
      error: result.success ? undefined : 'Payment confirmation failed'
    };

  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to confirm payment'
    };
  }
};

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const calculateOrderTotals = (items: any[], taxRate: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

export const validatePaymentData = (data: PaymentIntentData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.amount || data.amount <= 0) {
    errors.push('Invalid amount');
  }

  if (!data.customer.email || !/\S+@\S+\.\S+/.test(data.customer.email)) {
    errors.push('Valid email is required');
  }

  if (!data.customer.name || data.customer.name.trim().length < 2) {
    errors.push('Customer name is required');
  }

  if (!data.items || data.items.length === 0) {
    errors.push('At least one item is required');
  }

  if (!data.shipping.address.line1 || !data.shipping.address.city) {
    errors.push('Complete shipping address is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};