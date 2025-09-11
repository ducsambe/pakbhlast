import React from 'react';
import { Truck, Globe, Clock, Shield, Package, CheckCircle } from 'lucide-react';

const ShippingInfoPage = () => {
  const shippingZones = [
    {
      zone: "United States & Canada",
      time: "5-7 business days",
      cost: "FREE",
      icon: "🇺🇸",
      details: "Express shipping available for $15.99"
    },
    {
      zone: "Europe",
      time: "7-10 business days", 
      cost: "FREE",
      icon: "🇪🇺",
      details: "Customs duties may apply"
    },
    {
      zone: "Australia & New Zealand",
      time: "10-14 business days",
      cost: "FREE", 
      icon: "🇦🇺",
      details: "Tracked shipping included"
    },
    {
      zone: "Rest of World",
      time: "10-21 business days",
      cost: "FREE",
      icon: "🌍",
      details: "Customs duties may apply"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-blue-100">
            Free worldwide shipping on all orders
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Free Shipping Banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">FREE Worldwide Shipping</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer complimentary shipping to over 200 countries worldwide. No minimum order required!
          </p>
        </div>

        {/* Shipping Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {shippingZones.map((zone, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{zone.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">{zone.zone}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Time:</span>
                  <span className="font-semibold">{zone.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost:</span>
                  <span className="font-bold text-green-600">{zone.cost}</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">{zone.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How We Ship Your Order</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Order Processing</h3>
              <p className="text-gray-600 text-sm">We process your order within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Preparation</h3>
              <p className="text-gray-600 text-sm">Careful packaging and quality check</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Shipping</h3>
              <p className="text-gray-600 text-sm">Dispatched with tracking number</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">Safe delivery to your doorstep</p>
            </div>
          </div>
        </div>

        {/* Shipping Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Globe size={32} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Worldwide Coverage</h3>
            <p className="text-gray-600">We ship to over 200 countries globally</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Shield size={32} className="text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Secure Packaging</h3>
            <p className="text-gray-600">Professional packaging to protect your hair</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Package size={32} className="text-purple-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Order Tracking</h3>
            <p className="text-gray-600">Track your package every step of the way</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship