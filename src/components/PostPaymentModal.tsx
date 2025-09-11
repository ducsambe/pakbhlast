import React, { useState } from 'react';
import { CheckCircle, MessageCircle, Mail, Phone, Printer, X, FileText, Share2, ArrowLeft } from 'lucide-react';
import Invoice from './Invoice';
import { downloadInvoiceAsPDF } from '../utils/invoiceGenerator';
import { useCart } from '../context/CartContext';

interface PostPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentResult: any;
  orderDetails: {
    items: any[];
    total: number;
    customerInfo: {
      name: string;
      email: string;
      phone?: string;
    };
    billingAddress?: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  paymentMethod: 'stripe' | 'paypal';
}

const PostPaymentModal: React.FC<PostPaymentModalProps> = ({
  isOpen,
  onClose,
  paymentResult,
  orderDetails,
  paymentMethod
}) => {
  const { clearCart } = useCart();
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Clear cart when modal opens (payment was successful)
  React.useEffect(() => {
    if (isOpen) {
      clearCart();
    }
  }, [isOpen, clearCart]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) return null;

  const generateInvoiceData = () => {
    const invoice = {
      orderId: paymentResult.id || `ORD-${Date.now()}`,
      customerInfo: orderDetails.customerInfo,
      billingAddress: orderDetails.billingAddress || {
        address: 'Address not provided',
        city: 'City not provided',
        state: 'State not provided',
        zipCode: 'ZIP not provided',
        country: 'Country not provided'
      },
      items: orderDetails.items.map(item => ({
        name: item.name,
        shade: item.shade || item.color,
        length: item.length,
        quantity: item.quantity || 1,
        price: item.price
      })),
      subtotal: orderDetails.total,
      shipping: 0,
      tax: 0,
      total: orderDetails.total,
      paymentMethod: paymentMethod === 'stripe' ? 'Credit Card (Stripe)' : 'PayPal',
      transactionId: paymentResult.id,
      orderDate: new Date().toISOString()
    };
    setInvoiceData(invoice);
    setShowInvoice(true);
  };

  const handleDownloadInvoice = () => {
    if (!invoiceData) {
      generateInvoiceData();
    } else {
      downloadInvoiceAsPDF(invoiceData);
    }
  };

  const handlePrintInvoice = () => {
    if (!invoiceData) {
      generateInvoiceData();
    } else {
      window.print();
    }
  };

  const formatPaymentMethod = () => {
    if (paymentMethod === 'paypal') {
      return 'PayPal';
    } else {
      return 'Credit Card';
    }
  };

  const getTransactionId = () => {
    if (paymentMethod === 'paypal') {
                href="https://wa.me/+33634549649?text=Hi! I just completed my payment and have questions about my order."
    } else {
      return paymentResult.id;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>
          {/* Success Header */}
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center rounded-t-3xl">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Payment Successful! 🎉</h1>
            <p className="text-green-100 text-lg">
              Response time: Under 5 minutes via WhatsApp • 24 hours via email
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Transaction ID</p>
                  <p className="font-mono font-semibold text-gray-900">{getTransactionId()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-900">{formatPaymentMethod()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="font-bold text-green-600 text-lg">${orderDetails.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-green-600">Confirmed</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  ✅ Your payment has been processed successfully. You will receive a confirmation email shortly.
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-blue-200 last:border-b-0">
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
              </div>
            </div>

            {/* Action Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 text-center">What would you like to do next?</h3>
              
              {/* Primary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadInvoice}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                >
                  <FileText size={20} />
                  <span>Download Invoice</span>
                </button>
                
                <button
                  onClick={handlePrintInvoice}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2"
                >
                  <Printer size={20} />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Contact Options */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-center">Need Help or Have Questions?</h4>
                <p className="text-gray-600 text-center mb-4">
                  Our customer support team is ready to assist you with your order
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://wa.me/+33634549649?text=Hi! I just completed my payment and have questions about my order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                  
                  <a
                    href="mailto:anaroyes7@gmail.com?subject=Order Support - Payment Completed"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                  
                  <a
                    href="tel:+33634549649"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone size={18} />
                    <span>Call</span>
                  </a>
                </div>
                
                <p className="text-center text-gray-500 text-xs mt-3">
                  Average response time: Under 5 minutes via WhatsApp
                </p>
              </div>

              {/* Share Order */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Order Confirmation - PAKBH',
                      text: `I just ordered premium Afro Kinky Bulk Hair from PAKBH! Order #${getTransactionId()}`,
                      url: window.location.href
                    });
                  } else {
                    // Fallback for browsers that don't support Web Share API
                    const text = `I just ordered premium Afro Kinky Bulk Hair from PAKBH! Order #${getTransactionId()}`;
                    navigator.clipboard.writeText(text);
                    alert('Order details copied to clipboard!');
                  }
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 size={20} />
                <span>Share Your Order</span>
              </button>

              {/* Continue Shopping */}
              <button
                onClick={handleClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={20} />
                Continue Shopping
              </button>
            </div>

            {/* Delivery Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">📦 What's Next?</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Order processing: Within 24 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Tracking number sent via email</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Free worldwide shipping included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Estimated delivery: 5-7 business days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && invoiceData && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Invoice</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => downloadInvoiceAsPDF(invoiceData)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Print
                </button>
                <button
                  onClick={() => setShowInvoice(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <Invoice orderData={invoiceData} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPaymentModal;