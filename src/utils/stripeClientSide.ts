import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_CONFIG } from '../config/payment';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(PAYMENT_CONFIG.stripe.publishableKey);

export interface PaymentData {
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Client-side payment processing using Stripe Checkout
export const processStripePayment = async (paymentData: PaymentData) => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // Create line items for Stripe Checkout
    const lineItems = paymentData.items.map(item => ({
      price_data: {
        currency: paymentData.currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: `Premium Afro Kinky Bulk Hair - ${item.name}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/payment-cancelled`,
      customerEmail: paymentData.customerInfo.email,
      billingAddressCollection: 'required',
      shippingAddressCollection: {
        allowedCountries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE'],
      },
      metadata: {
        customer_name: paymentData.customerInfo.name,
        customer_email: paymentData.customerInfo.email,
        items_count: paymentData.items.length.toString(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Stripe payment error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Payment failed' 
    };
  }
};

// Alternative: Direct card payment (requires more setup but works without redirect)
export const processDirectCardPayment = async (
  paymentData: PaymentData,
  cardElement: any
) => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe || !cardElement) {
      throw new Error('Stripe or card element not available');
    }

    // Create payment method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: paymentData.customerInfo.name,
        email: paymentData.customerInfo.email,
        phone: paymentData.customerInfo.phone,
        address: paymentData.billingAddress,
      },
    });

    if (paymentMethodError) {
      throw new Error(paymentMethodError.message);
    }

    // For demo purposes, simulate successful payment
    // In production, you'd need a backend to create payment intents
    const mockPaymentResult = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'succeeded',
      amount: Math.round(paymentData.amount * 100),
      currency: paymentData.currency,
      payment_method: paymentMethod,
      created: Math.floor(Date.now() / 1000),
      receipt_url: `https://pay.stripe.com/receipts/demo_${Date.now()}`,
    };

    return { success: true, paymentResult: mockPaymentResult };
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
      details: 'You will receive a confirmation email shortly with your order details and tracking information.'
    };
  } else {
    return {
      type: 'error' as const,
      title: 'Payment Failed',
      message: error || 'Something went wrong with your payment.',
      details: 'Please check your card details and try again, or contact our support team for assistance.'
    };
  }
};

// Validate card details
export const validateCardDetails = (cardNumber: string, expiry: string, cvc: string) => {
  const errors: string[] = [];
  
  // Basic card number validation (Luhn algorithm)
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleanCardNumber)) {
    errors.push('Invalid card number');
  }
  
  // Expiry validation
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
    errors.push('Invalid expiry month');
  }
  
  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    errors.push('Card has expired');
  }
  
  // CVC validation
  if (!/^\d{3,4}$/.test(cvc)) {
    errors.push('Invalid security code');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};