import React, { useEffect, useState } from 'react';
import { CheckCircle, Share2, X, Package, Truck,  CreditCard, FileText, Printer } from 'lucide-react';
import { downloadInvoiceAsPDF } from '../utils/invoiceGenerator';

interface PaymentResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentResult: any;
  orderDetails: any;
}

const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  isOpen,
  onClose,
  paymentResult,
  orderDetails
}) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setAnimationStep(1), 100);
      const timer2 = setTimeout(() => setAnimationStep(2), 300);
      const timer3 = setTimeout(() => setAnimationStep(3), 600);
      const timer4 = setTimeout(() => setAnimationStep(4), 900);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isOpen]);

  if (!isOpen || !paymentResult || !orderDetails) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Success Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center rounded-t-3xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-4 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-500"></div>
          </div>
          
          {/* Success Icon */}
          <div className={`relative w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-1000 ${
            animationStep >= 1 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
          }`}>
            <CheckCircle size={48} className="text-green-500" />
          </div>
          
          <h1 className={`text-3xl font-bold mb-2 transform transition-all duration-700 delay-300 ${
            animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Paiement réussi! 🎉
          </h1>
          
          <p className={`text-green-100 text-lg transform transition-all duration-700 delay-500 ${
            animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Votre commande a été confirmée et est en cours de traitement
          </p>
        </div>

        <div className={`p-8 space-y-6 transform transition-all duration-700 delay-700 ${
          animationStep >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package size={20} className="mr-2 text-gray-600" />
              Détails de la commande
            </h3>
            
            <div className="space-y-3">
              {orderDetails.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.shade && `Shade: ${item.shade}`}
                      {item.length && ` • Length: ${item.length}"`}
                      {item.quantity && ` • Qty: ${item.quantity}`}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
              
              <div className="pt-4 border-t-2 border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total payé:</span>
                  <span className="text-2xl font-bold text-green-600">
                    €{orderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard size={20} className="mr-2 text-blue-600" />
              Informations de paiement
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ID de transaction</p>
                <p className="font-mono font-semibold text-gray-900">{paymentResult.id}</p>
              </div>
              <div>
                <p className="text-gray-600">Méthode de paiement</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {paymentResult.payment_method?.card?.brand} •••• {paymentResult.payment_method?.card?.last4}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Date et heure</p>
                <p className="font-semibold text-gray-900">{formatDate(paymentResult.created)}</p>
              </div>
              <div>
                <p className="text-gray-600">Statut</p>
                <p className="font-semibold text-green-600 capitalize">{paymentResult.status}</p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-yellow-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Truck size={20} className="mr-2 text-yellow-600" />
              Expédition et livraison
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Livraison estimée:</span>
                <span className="font-semibold text-gray-900">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Méthode de livraison:</span>
                <span className="font-semibold text-green-600">Livraison mondiale gratuite</span>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3 mt-4">
                <p className="text-yellow-800 text-sm">
                  📦 Votre commande sera traitée dans les 24 heures. Vous recevrez un numéro de suivi par email une fois expédiée.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                if (paymentResult && orderDetails) {
                  const invoiceData = {
                    orderId: paymentResult.id,
                    customerInfo: orderDetails.customerInfo,
                    billingAddress: {
                      address: 'Adresse de facturation',
                      city: 'Ville',
                      state: 'État',
                      zipCode: 'Code postal',
                      country: 'Pays'
                    },
                    items: orderDetails.items.map((item: any) => ({
                      name: item.name,
                      shade: item.shade,
                      length: item.length,
                      quantity: item.quantity || 1,
                      price: item.price
                    })),
                    subtotal: orderDetails.total,
                    shipping: 0,
                    tax: 0,
                    total: orderDetails.total,
                    paymentMethod: 'Carte de crédit',
                    transactionId: paymentResult.id,
                    orderDate: new Date().toISOString()
                  };
                  downloadInvoiceAsPDF(invoiceData);
                }
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <FileText size={20} />
              <span>Télécharger la facture</span>
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Printer size={20} />
              <span>Imprimer le reçu</span>
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Confirmation de commande',
                    text: `Je viens de commander des extensions de cheveux premium chez PAKBH! Commande #${paymentResult.id}`,
                    url: window.location.href
                  });
                }
              }}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Share2 size={20} />
              <span>Partager la commande</span>
            </button>
          </div>

          {/* Support Information */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Des questions sur votre commande? Nous sommes là pour vous aider!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/+33634549649?text=Bonjour! J'ai des questions sur ma commande."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Support WhatsApp
              </a>
              <a
                href="mailto:anaroyes7@gmail.com"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Support Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultModal;