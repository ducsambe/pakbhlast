import React from 'react';
import { AlertCircle, RefreshCw, X, CreditCard, HelpCircle, MessageCircle } from 'lucide-react';

interface PaymentErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  error: string;
  orderDetails: {
    items: any[];
    total: number;
  };
}

const PaymentErrorModal: React.FC<PaymentErrorModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  error,
  orderDetails
}) => {
  if (!isOpen) return null;

  const getErrorSuggestion = (error: string) => {
    if (error.includes('declined')) {
      return {
        title: 'Card Declined',
        suggestions: [
          'Check if you have sufficient funds',
          'Verify your card details are correct',
          'Try a different payment method',
          'Contact your bank if the issue persists'
        ],
        icon: CreditCard,
        color: 'text-red-600'
      };
    } else if (error.includes('expired')) {
      return {
        title: 'Card Expired',
        suggestions: [
          'Check your card expiry date',
          'Use a different card',
          'Contact your bank for a replacement card'
        ],
        icon: CreditCard,
        color: 'text-orange-600'
      };
    } else if (error.includes('security code') || error.includes('CVC')) {
      return {
        title: 'Security Code Error',
        suggestions: [
          'Check the 3-digit code on the back of your card',
          'For Amex cards, use the 4-digit code on the front',
          'Make sure you\'re entering the correct CVC'
        ],
        icon: CreditCard,
        color: 'text-yellow-600'
      };
    } else {
      return {
        title: 'Payment Error',
        suggestions: [
          'Check your internet connection',
          'Try refreshing the page',
          'Use a different browser',
          'Contact our support team'
        ],
        icon: AlertCircle,
        color: 'text-red-600'
      };
    }
  };

  const errorInfo = getErrorSuggestion(error);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white p-8 text-center rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          {/* Error Icon */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
          <p className="text-red-100 text-lg">Don't worry, your order is still saved</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Error Details */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <errorInfo.icon size={24} className={errorInfo.color} />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{errorInfo.title}</h3>
                <p className="text-red-700 mb-4">{error}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What you can try:</h4>
                  <ul className="space-y-1">
                    {errorInfo.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Order (Still Saved)</h3>
            
            <div className="space-y-3">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.shade} • {item.length} • Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t-2 border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Payment Methods */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Try Alternative Payment Methods</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-3 mb-2">
                  <CreditCard size={20} className="text-blue-600" />
                  <span className="font-semibold">Different Card</span>
                </div>
                <p className="text-sm text-gray-600">Try using a different credit or debit card</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-3 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
                  </svg>
                  <span className="font-semibold">PayPal</span>
                </div>
                <p className="text-sm text-gray-600">Pay securely with your PayPal account</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRetry}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Support Section */}
          <div className="text-center pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HelpCircle size={20} className="text-gray-600" />
              <span className="text-gray-600 font-medium">Need Help?</span>
            </div>
            
            <p className="text-gray-600 mb-4">
              Our support team is ready to help you complete your purchase
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/+17866280163?text=Hi! I'm having trouble with payment for my order."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Support</span>
              </a>
              
              <a
                href="mailto:anaroyes7@gmail.com?subject=Payment Issue - Order Help Needed"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Email Support
              </a>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Average response time: Under 5 minutes via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorModal;