import React from 'react';
import { 
  Truck, 
  Globe, 
  Clock, 
  Shield, 
  Package, 
  CheckCircle, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Lock // Added Lock import
} from 'lucide-react';

const ShippingPaymentPage = () => {
  const shippingZones = [
    {
      zone: "France",
      time: "2-3 business days",
      cost: "FREE over €50, otherwise €4.90",
      icon: "🇫🇷",
      details: "Express delivery available"
    },
    {
      zone: "Europe (EU)",
      time: "3-7 business days", 
      cost: "FREE over €75, otherwise €9.90",
      icon: "🇪🇺",
      details: "No customs duties within EU"
    },
    {
      zone: "United Kingdom",
      time: "5-8 business days",
      cost: "FREE over €100, otherwise €12.90",
      icon: "🇬🇧",
      details: "Customs duties may apply"
    },
    {
      zone: "United States & Canada",
      time: "7-12 business days",
      cost: "FREE over €150, otherwise €19.90",
      icon: "🇺🇸",
      details: "Tracked shipping included"
    },
    {
      zone: "Rest of World",
      time: "10-21 business days",
      cost: "FREE over €200, otherwise €24.90",
      icon: "🌍",
      details: "Customs duties may apply"
    }
  ];

  const paymentMethods = [
    {
      name: "Credit & Debit Cards",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      security: "3D Secure authentication",
      processing: "Instant"
    },
    {
      name: "PayPal",
      icon: Smartphone,
      description: "PayPal account or Pay in 4",
      security: "PayPal buyer protection",
      processing: "Instant"
    },
    {
      name: "Bank Transfer",
      icon: Banknote,
      description: "SEPA, Wire transfer",
      security: "Bank-level security",
      processing: "1-3 business days"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping & Payment</h1>
          <p className="text-xl text-blue-100">
            Fast, secure shipping worldwide with multiple payment options
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shipping Information</h2>
          
          {/* Free Shipping Banner */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">FREE Shipping Available</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enjoy free shipping on qualifying orders. Minimum order values vary by region.
            </p>
          </div>

          {/* Shipping Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {shippingZones.map((zone, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{zone.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{zone.zone}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold">{zone.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Cost:</span>
                    <span className="font-semibold text-blue-600">{zone.cost}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">{zone.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Shipping Process</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={24} className="text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Order Processing</h4>
                <p className="text-gray-600 text-sm">Orders processed within 24-48 hours</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Quality Check</h4>
                <p className="text-gray-600 text-sm">Each order is carefully inspected</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck size={24} className="text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Dispatch</h4>
                <p className="text-gray-600 text-sm">Shipped with tracking number</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Delivery</h4>
                <p className="text-gray-600 text-sm">Safe delivery to your address</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon size={32} className="text-gray-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">{method.name}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Security:</span>
                    <span className="font-medium">{method.security}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Processing:</span>
                    <span className="font-medium">{method.processing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Security */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Your Payment is 100% Secure</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We use industry-leading security measures to protect your payment information. 
              All transactions are encrypted with SSL technology.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <Shield size={20} className="mx-auto mb-2" />
                <span>SSL Encrypted</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <CheckCircle size={20} className="mx-auto mb-2" />
                <span>PCI Compliant</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Lock size={20} className="mx-auto mb-2" />
                <span>3D Secure</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Globe size={20} className="mx-auto mb-2" />
                <span>Fraud Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPaymentPage;