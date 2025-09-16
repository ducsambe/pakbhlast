

export const PAYMENT_CONFIG = {
  
  stripe: {
    publishableKey: "pk_live_Q18qJa46wipTLV9n7mxkGAJm",
    currency: "usd",
    environment: "live"
  },
  
  paypal: {
    clientId: "BAA7oT9WHYEHwwj5uhdWR0W9f3AU6TUCkEQ0JcxDeAVnNWOl4u17c3wYVcmCWmDXOe3Hvh5E0hqFjp6W-4",
    currency: "usd",
    environment: "live"
  }
};


export const TEST_CARDS = {
  visa: "4242424242424242",
  visaDebit: "4000056655665556", 
  mastercard: "5555555555554444",
  amex: "378282246310005",
  declined: "4000000000000002",
  requiresAuth: "4000002500003155",
  expired: "4000000000000069",
  incorrectCvc: "4000000000000127",
  processingError: "4000000000000119"
};


export const PAYMENT_METHODS = {
  card: {
    enabled: true,
    name: "Credit/Debit Card",
    icon: "CreditCard",
    description: "Visa, Mastercard, American Express"
  },
  paypal: {
    enabled: true, 
    name: "PayPal",
    icon: "PayPal", 
    description: "Pay with your PayPal account or Pay Later"
  },
  stripe: {
    enabled: true,
    name: "Stripe Checkout",
    icon: "Stripe",
    description: "Secure hosted payment page"
  }
};


export const CURRENCY_CONFIG = {
  code: "USD",
  symbol: "$",
  locale: "en-US"
};


export const TAX_CONFIG = {
  rate: 0.00, 
  included: false
};


export const SHIPPING_CONFIG = {
  freeShippingThreshold: 0, 
  defaultRate: 0,
  expeditedRate: 9.99, // Express shipping within US
  canadaRate: 0, // Free to Canada over $75
  mexicoRate: 0, // Free to Mexico over $100
  internationalRate: 0 // Free international over $150
};


export const SECURITY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  sessionTimeout: 30 * 60 * 1000,
  encryptionEnabled: true
};


export const ERROR_MESSAGES = {
  CARD_DECLINED: "Your card was declined. Please try a different payment method or contact your bank.",
  EXPIRED_CARD: "Your card has expired. Please use a different card.",
  INCORRECT_CVC: "Your card's security code is incorrect. Please check and try again.",
  INSUFFICIENT_FUNDS: "Insufficient funds. Please check your account balance or use a different card.",
  PROCESSING_ERROR: "There was an error processing your payment. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again or contact support."
};