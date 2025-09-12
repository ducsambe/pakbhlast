import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_CONFIG } from '../config/payment';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(PAYMENT_CONFIG.stripe.publishableKey);

// Use local server for development
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

export interface PaymentData {
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  billingAddress?: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  shippingAddress?: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: Array<{
    id?: string;
    name: string;
    quantity: number;
    price: number;
    description?: string;
    image?: string;
  }>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
  sessionId?: string;
}

// Create checkout session on server and redirect to Stripe Checkout
export const processStripeCheckout = async (paymentData: PaymentData): Promise<PaymentResult> => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Create checkout session on server
    const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(paymentData.amount * 100), // Convert to cents
        currency: paymentData.currency.toLowerCase(),
        customerInfo: paymentData.customerInfo,
        items: paymentData.items,
        billingAddress: paymentData.billingAddress,
        shippingAddress: paymentData.shippingAddress,
        successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment-cancelled`,
        metadata: {
          customer_name: paymentData.customerInfo.name,
          customer_email: paymentData.customerInfo.email,
          items_count: paymentData.items.length.toString(),
          total_amount: paymentData.amount.toString(),
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const { sessionId } = await response.json();

    if (!sessionId) {
      throw new Error('No session ID returned from server');
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, sessionId };

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Checkout failed' 
    };
  }
};

// Process direct card payment using Payment Intents (recommended for custom UI)
export const processDirectCardPayment = async (
  paymentData: PaymentData,
  cardElement: any
): Promise<PaymentResult> => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe || !cardElement) {
      throw new Error('Stripe or card element not available');
    }

    // First, create payment intent on server
    const intentResponse = await fetch(`${API_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(paymentData.amount * 100),
        currency: paymentData.currency.toLowerCase(),
        customer: paymentData.customerInfo,
        items: paymentData.items,
        metadata: {
          customer_name: paymentData.customerInfo.name,
          customer_email: paymentData.customerInfo.email,
          items_count: paymentData.items.length.toString(),
        },
        automatic_payment_methods: {
          enabled: true,
        }
      }),
    });

    if (!intentResponse.ok) {
      const errorData = await intentResponse.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }

    const { client_secret: clientSecret } = await intentResponse.json();

    if (!clientSecret) {
      throw new Error('No client secret returned from server');
    }

    // Confirm payment with card element
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: paymentData.customerInfo.name,
          email: paymentData.customerInfo.email,
          phone: paymentData.customerInfo.phone,
          address: paymentData.billingAddress,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: paymentIntent?.status === 'succeeded',
      paymentIntent,
      error: paymentIntent?.status !== 'succeeded' ? 'Payment failed' : undefined
    };

  } catch (error) {
    console.error('Direct payment error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Payment failed' 
    };
  }
};

// Handle payment result messages
export const getPaymentResultMessage = (success: boolean, error?: string) => {
  if (success) {
    return {
      type: 'success' as const,
      title: 'Payment Successful! 🎉',
      message: 'Your order has been confirmed and will be processed within 24 hours.',
      details: 'You will receive a confirmation email shortly with your order details and tracking information.',
      icon: '✅'
    };
  } else {
    const errorMessages: { [key: string]: string } = {
      'card_declined': 'Your card was declined. Please try another card.',
      'insufficient_funds': 'Insufficient funds. Please try another payment method.',
      'expired_card': 'Your card has expired. Please use a different card.',
      'invalid_cvc': 'The security code is invalid. Please check and try again.',
      'processing_error': 'A processing error occurred. Please try again.',
    };

    const errorMessage = error && errorMessages[error] 
      ? errorMessages[error] 
      : error || 'Something went wrong with your payment.';

    return {
      type: 'error' as const,
      title: 'Payment Failed',
      message: errorMessage,
      details: 'Please check your payment details and try again, or contact our support team for assistance.',
      icon: '❌'
    };
  }
};

// Validate card details client-side
export const validateCardDetails = (cardNumber: string, expiry: string, cvc: string) => {
  const errors: string[] = [];
  
  // Basic card number validation
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleanCardNumber)) {
    errors.push('Invalid card number');
  }
  
  // Expiry validation
  const [month, year] = expiry.split('/').map(part => part.trim());
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
    errors.push('Invalid expiry date format (MM/YY)');
  } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    errors.push('Card has expired');
  }
  
  // CVC validation
  if (!/^\d{3,4}$/.test(cvc)) {
    errors.push('Invalid security code (3-4 digits required)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Check if Stripe is loaded and ready
export const isStripeLoaded = async (): Promise<boolean> => {
  try {
    const stripe = await stripePromise;
    return !!stripe;
  } catch (error) {
    console.error('Stripe loading error:', error);
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

// Calculate order total
export const calculateOrderTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};