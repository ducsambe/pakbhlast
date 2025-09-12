import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CheckCircle, AlertCircle, Loader2, CreditCard } from 'lucide-react';

interface PaymentFormProps {
  total: number;
  items: any[];
  formData: any;
  onPaymentResult: (result: any) => void;
  isFormValid: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  total,
  items,
  formData,
  onPaymentResult,
  isFormValid
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onPaymentResult({
        type: 'error',
        title: 'Erreur du système de paiement',
        message: 'Le système de paiement est en cours de chargement. Veuillez réessayer.',
        details: 'Le système de paiement est temporairement indisponible.'
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentResult({
        type: 'error',
        title: 'Erreur de carte',
        message: 'Veuillez saisir les détails de votre carte.',
        details: 'Les informations de carte sont requises pour traiter le paiement.'
      });
      return;
    }

    if (!isFormValid) {
      onPaymentResult({
        type: 'error',
        title: 'Formulaire incomplet',
        message: 'Veuillez remplir tous les champs requis.',
        details: 'Toutes les informations de livraison sont nécessaires.'
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country,
          },
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Simulate successful payment for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockPaymentResult = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount: Math.round(total * 100),
        currency: 'eur',
        payment_method: paymentMethod,
        created: Math.floor(Date.now() / 1000),
        receipt_url: `https://pay.stripe.com/receipts/demo_${Date.now()}`,
      };

      onPaymentResult({
        type: 'success',
        title: 'Payment Successful! 🎉',
        message: 'Your order has been confirmed and will be processed within 24 hours.',
        details: 'You will receive a confirmation email with your order details and tracking information.',
        paymentData: mockPaymentResult,
        orderData: {
          customerInfo: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
          },
          items: items,
          total: total
        },
      });

    } catch (error) {
      onPaymentResult({
        type: 'error',
        title: 'Payment Failed',
        message: error instanceof Error ? error.message : 'Something went wrong with your payment.',
        details: 'Please check your card details and try again, or contact our support team.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#dc2626',
        iconColor: '#dc2626',
      },
      complete: {
        color: '#059669',
        iconColor: '#059669',
      },
    },
    hidePostalCode: false,
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Element */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Card Information
        </label>
        <div className={`border-2 rounded-lg p-4 transition-all duration-200 ${
          cardComplete 
            ? 'border-green-500 bg-green-50' 
            : cardError 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'
        }`}>
          <CardElement 
            options={cardElementOptions} 
            onChange={handleCardChange}
          />
        </div>
        
        {cardComplete && (
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <CheckCircle size={14} />
            <span>Card information is complete</span>
          </div>
        )}
        
        {cardError && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle size={14} />
            <span>{cardError}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || !cardComplete || !isFormValid}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : cardComplete && isFormValid
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
            <span>Pay ${total.toFixed(2)} Securely</span>
          </>
        )}
      </button>

      {/* Test Cards Info */}
      {import.meta.env.DEV && (
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
      )}
    </form>
  );
};

export default PaymentForm;