import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_CONFIG } from '../config/payment';
import { Lock, CreditCard, Shield, CheckCircle } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(PAYMENT_CONFIG.stripe.publishableKey);

interface StripeCheckoutProps {
  amount: number;
  items: any[];
  customerInfo: {
    email: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  onSuccess: (session: any) => void;
  onError: (error: string) => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amount,
  items,
  customerInfo,
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // In a real application, you would call your backend to create a checkout session
      // For demo purposes, we'll simulate the checkout process
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create line items for Stripe
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `${item.shade} • ${item.length}`,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      }));

      // Mock successful checkout session creation
      const mockSession = {
        id: `cs_${Date.now()}`,
        url: `https://checkout.stripe.com/pay/cs_${Date.now()}`,
        payment_status: 'paid',
        amount_total: Math.round(amount * 100),
        currency: 'usd',
        customer_details: {
          email: customerInfo.email,
          name: customerInfo.name,
        },
        line_items: lineItems,
        created: Math.floor(Date.now() / 1000),
      };

      // Simulate successful payment
      onSuccess(mockSession);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Checkout failed';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stripe Checkout Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield size={20} className="text-blue-600" />
          <h4 className="font-bold text-blue-800">Secure Stripe Checkout</h4>
        </div>
        <p className="text-blue-700 text-sm">
          You'll be redirected to Stripe's secure checkout page to complete your payment.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name} ({item.shade}, {item.length})</span>
              <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Creating Checkout Session...</span>
          </>
        ) : (
          <>
            <CreditCard size={20} />
            <span>Proceed to Stripe Checkout</span>
          </>
        )}
      </button>

      {/* Security Features */}
      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="flex flex-col items-center space-y-1">
          <Lock size={16} className="text-green-600" />
          <span className="text-gray-600">SSL Encrypted</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <Shield size={16} className="text-green-600" />
          <span className="text-gray-600">PCI Compliant</span>
        </div>
      </div>

      {/* Test Mode Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-yellow-800 text-sm font-medium">
          🧪 Test Mode: Use card 4242 4242 4242 4242 with any future expiry date and CVC
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;