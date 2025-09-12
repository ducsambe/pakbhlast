import React, { useState, useEffect } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Lock, CreditCard, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { PAYMENT_CONFIG } from '../config/payment';
import { createPaymentIntent, confirmPayment } from '../utils/paymentService';
import { stripePromise } from '../utils/stripeHelpers';


interface StripePaymentFormProps {
  amount: number;
  onSuccess: (paymentResult: any) => void;
  onError: (error: string) => void;
  customerInfo: {
    email: string;
    name: string;
    phone?: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items?: any[];
  isFormValid: boolean;
}

const CheckoutForm: React.FC<StripePaymentFormProps> = ({
  amount,
  onSuccess,
  onError,
  customerInfo,
  billingAddress,
  items = [],
  isFormValid
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [cardComplete, setCardComplete] = useState(false);
  const [cardBrand, setCardBrand] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !isFormValid) {
      if (!isFormValid) {
        setPaymentError('Please fill in all required fields above.');
      } else {
        setPaymentError('Stripe has not loaded yet. Please try again.');
      }
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setPaymentError('Card element not found');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // Create payment method first
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: billingAddress,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // For demo purposes, simulate successful payment
      console.log('Demo mode: Simulating successful payment');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock payment intent result
      const mockPaymentIntent = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount: Math.round(amount * 100),
        currency: 'usd',
        payment_method: paymentMethod,
        created: Math.floor(Date.now() / 1000),
        receipt_url: `https://pay.stripe.com/receipts/demo_${Date.now()}`,
        charges: {
          data: [{
            id: `ch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            receipt_url: `https://pay.stripe.com/receipts/demo_${Date.now()}`
          }]
        }
      };

      onSuccess(mockPaymentIntent);

      /* Original server-based code - commented out for demo mode
      const paymentIntentResult = await createPaymentIntent({
        amount: amount,
        currency: 'USD',
        customer: customerInfo,
        items: items.map(item => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          color: item.shade || item.color,
          length: item.length
        })),
        shipping: {
          name: customerInfo.name,
          address: billingAddress
        }
      });

      if (!paymentIntentResult.success || !paymentIntentResult.paymentIntent) {
        throw new Error(paymentIntentResult.error || 'Failed to create payment intent');
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentResult.paymentIntent.client_secret,
        {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: billingAddress,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on server for email notifications
        await confirmPayment(paymentIntent.id);
      }
      */

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146',
      },
      complete: {
        color: '#28a745',
        iconColor: '#28a745',
      },
    },
    hidePostalCode: false,
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardBrand(event.brand || '');
    
    if (event.error) {
      setPaymentError(event.error.message);
    } else {
      setPaymentError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Element */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Card Information
        </label>
        <div className={`bg-white border-2 rounded-xl p-4 transition-all duration-200 ${
          cardComplete 
            ? 'border-green-500 bg-green-50' 
            : paymentError 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'
        }`}>
          <CardElement 
            options={cardElementOptions} 
            onChange={handleCardChange}
          />
        </div>
        
        {/* Card completion indicator */}
        {cardComplete && (
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <CheckCircle size={16} />
            <span>Card information is complete</span>
            {cardBrand && (
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
                {cardBrand}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {paymentError && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-700 font-medium">{paymentError}</p>
          </div>
        </div>
      )}

      {/* Test Cards Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-bold text-blue-800 mb-2 flex items-center">
          <CreditCard size={16} className="mr-2" />
          Test Mode - Use These Cards
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Success:</strong> 4242 4242 4242 4242</p>
          <p><strong>Declined:</strong> 4000 0000 0000 0002</p>
          <p><strong>Requires Auth:</strong> 4000 0025 0000 3155</p>
          <p className="text-blue-600 mt-2">Use any future expiry date and any 3-digit CVC</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || !cardComplete || !isFormValid}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : cardComplete && isFormValid
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gradient-to-r from-gray-600 to-gray-500 text-white cursor-not-allowed'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock size={20} />
            <span>Pay ${amount.toFixed(2)} Securely</span>
          </>
        )}
      </button>

      {/* Security Notice */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border">
          <Shield size={14} className="text-green-600" />
          <span>Your payment is secured by Stripe with 256-bit SSL encryption</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We never store your card details. All transactions are processed securely by Stripe.
        </p>
      </div>
    </form>
  );
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  const stripeOptions = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default StripePaymentForm;