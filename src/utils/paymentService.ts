// Enhanced payment service for client's Stripe account
import { PAYMENT_CONFIG } from '../config/payment';

// const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : 'https://serveforpakbh.onrender.com/api';

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
}

// Create payment intent on server
export const createPaymentIntent = async (data: PaymentIntentData): Promise<PaymentResult> => {
  try {
    console.log('Creating payment intent with data:', data);

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
      paymentIntent: result
    };

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment intent'
    };
  }
};

// Confirm payment after successful Stripe confirmation
export const confirmPayment = async (paymentIntentId: string): Promise<PaymentResult> => {
  try {
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

// Get payment intent details
export const getPaymentIntent = async (paymentIntentId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment-intent/${paymentIntentId}`);
    
    if (!response.ok) {
      throw new Error('Failed to retrieve payment intent');
    }

    return await response.json();

  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
};

// Health check for server connection
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    
    console.log('Server health check:', data);
    return data.status === 'OK' && data.stripe_connected && data.stripe_key_configured;

  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

// Format currency for display
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Calculate order totals including tax and shipping
export const calculateOrderTotals = (items: any[], taxRate: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

// Validate payment data before processing
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