import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Share2, X, Package, Truck, Calendar, CreditCard } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentResult: any;
  orderDetails: {
    items: any[];
    total: number;
    customerInfo: any;
  };
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  paymentResult,
  orderDetails
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      
      // Animation sequence
      const timeouts = [
        setTimeout(() => setAnimationStep(1), 300),
        setTimeout(() => setAnimationStep(2), 800),
        setTimeout(() => setAnimationStep(3), 1300),
      ];

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-500 scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          {/* Success Icon with Animation */}
          <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-700 ${
            animationStep >= 1 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            <CheckCircle size={40} className="text-green-500" />
          </div>
          
          <h1 className={`text-3xl font-bold mb-2 transform transition-all duration-700 delay-300 ${
            animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Payment Successful! 🎉
          </h1>
          
          <p className={`text-green-100 text-lg transform transition-all duration-700 delay-500 ${
            animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Your order has been confirmed and is being processed
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package size={20} className="mr-2 text-gray-600" />
              Order Details
            </h3>
            
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
                  <span className="text-lg font-bold text-gray-900">Total Paid:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard size={20} className="mr-2 text-blue-600" />
              Payment Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Transaction ID</p>
                <p className="font-mono font-semibold text-gray-900">{paymentResult.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {paymentResult.payment_method?.card?.brand} •••• {paymentResult.payment_method?.card?.last4}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-semibold text-gray-900">{formatDate(paymentResult.created)}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-semibold text-green-600 capitalize">{paymentResult.status}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-yellow-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Truck size={20} className="mr-2 text-yellow-600" />
              Shipping & Delivery
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold text-gray-900">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping Method:</span>
                <span className="font-semibold text-green-600">FREE Worldwide Shipping</span>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3 mt-4">
                <p className="text-yellow-800 text-sm">
                  📦 Your order will be processed within 24 hours. You'll receive a tracking number via email once shipped.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Download size={20} />
              <span>Download Receipt</span>
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Order Confirmation',
                    text: `I just ordered premium hair extensions from Blen Hairs! Order #${paymentResult.id}`,
                    url: window.location.href
                  });
                }
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Share2 size={20} />
              <span>Share Order</span>
            </button>
          </div>

          {/* Support Information */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Questions about your order? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/+17866280163?text=Hi! I have questions about my order."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                WhatsApp Support
              </a>
              <a
                href="mailto:anaroyes7@gmail.com"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;