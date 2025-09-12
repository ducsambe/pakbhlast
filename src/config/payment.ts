// Payment Configuration
// Updated with client's Stripe and PayPal keys

export const PAYMENT_CONFIG = {
  // Stripe Configuration - Updated with client's test key
  stripe: {
    publishableKey: "pk_live_51QhJJREuaVeOB1RXJhJJREuaVeOB1RXJhJJREuaVeOB1RXJhJJREuaVeOB1RXJhJJREuaVeOB1RXJhJJREuaVeOB1RX00abcdefgh",
    currency: "USD",
    environment: "live"
  },
  // PayPal Configuration - Updated with client's ID
  paypal: {
    clientId: "AQzOhyCC1nOzwCaF2ElixgnO7m4A_KfuRbR31eMe7xDjpvmVNFNpts0dbOSMsIrwoHaITvwm_vQaNyXP_t",
    currency: "USD",
    environment: "live"
  }
};

// Test Card Numbers for Development
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

// Payment Methods Configuration
export const PAYMENT_METHODS = {
  card: {
    enabled: true,
    name: "Credit/Debit Card",
    icon: "CreditCard",
    description: "Visa, Mastercard, American Express"
  },
  paypal: {
    enabled: true, // Now enabled with client's PayPal ID
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

// Currency Configuration
export const CURRENCY_CONFIG = {
  code: "USD",
  symbol: "$",
  locale: "en-US"
};

// Tax Configuration
export const TAX_CONFIG = {
  rate: 0.00, // No tax for now - adjust as needed
  included: false
};

// Shipping Configuration
export const SHIPPING_CONFIG = {
  freeShippingThreshold: 0, // Free shipping on all orders
  defaultRate: 0,
  expeditedRate: 15.99,
  internationalRate: 0 // Free international shipping
};

// Security Configuration
export const SECURITY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  sessionTimeout: 30 * 60 * 1000,
  encryptionEnabled: true
};

// Error Messages
export const ERROR_MESSAGES = {
  CARD_DECLINED: "Your card was declined. Please try a different payment method or contact your bank.",
  EXPIRED_CARD: "Your card has expired. Please use a different card.",
  INCORRECT_CVC: "Your card's security code is incorrect. Please check and try again.",
  INSUFFICIENT_FUNDS: "Insufficient funds. Please check your account balance or use a different card.",
  PROCESSING_ERROR: "There was an error processing your payment. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again or contact support."
};