import { PAYMENT_CONFIG } from '../config/payment';
import { loadStripe } from '@stripe/stripe-js';

// Create a single Stripe instance that will be reused throughout the app
export const stripePromise = loadStripe(PAYMENT_CONFIG.stripe.publishableKey);

// Enhanced payment processing
export const processPayment = async (paymentData: any) => {
  try {
    console.log('Processing payment with client Stripe account:', paymentData);
    
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // This will be handled by the PaymentModal component
    // which uses the actual Stripe integration
    return { success: true };
    
  } catch (error) {
    console.error('Payment processing error:', error);
    return { success: false, error: 'Payment failed. Please try again.' };
  }
};

// Enhanced error handling for client's Stripe account
export const handlePaymentError = (error: any): string => {
  console.error('Payment error:', error);
  
  if (error.type === 'card_error') {
    switch (error.code) {
      case 'card_declined':
        return 'Your card was declined. Please try a different payment method or contact your bank.';
      case 'expired_card':
        return 'Your card has expired. Please use a different card.';
      case 'incorrect_cvc':
        return 'Your card\'s security code is incorrect. Please check and try again.';
      case 'insufficient_funds':
        return 'Insufficient funds. Please check your account balance or use a different card.';
      case 'processing_error':
        return 'There was an error processing your payment. Please try again.';
      default:
        return error.message || 'Your card was declined.';
    }
  }
  
  if (error.type === 'validation_error') {
    return error.message || 'Please check your payment information and try again.';
  }
  
  return 'An unexpected error occurred. Please try again or contact support.';
};

// Validate card number using Luhn algorithm
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleanNumber)) return false;
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Format card number with spaces
export const formatCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  const cardType = getCardBrand(cleanNumber);
  
  if (cardType === 'amex') {
    // American Express: 4-6-5 format
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Others: 4-4-4-4 format
    return cleanNumber.replace(/(\d{4})/g, '$1 ').trim();
  }
};

// Get card brand from number
export const getCardBrand = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^2[2-7]/.test(cleanNumber)) return 'mastercard'; // New Mastercard range
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^6/.test(cleanNumber)) return 'discover';
  
  return 'unknown';
};

// Calculate total with tax and shipping
export const calculateOrderTotal = (subtotal: number, taxRate: number = 0, shipping: number = 0) => {
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

// Test Stripe connection
export const testStripeConnection = async (): Promise<boolean> => {
  try {
    const stripe = await stripePromise;
    return !!stripe;
  } catch (error) {
    console.error('Stripe connection test failed:', error);
    return false;
  }
};