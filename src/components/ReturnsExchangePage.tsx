import React from 'react';
import { RotateCcw, Package, CheckCircle, AlertTriangle, Clock, Shield, Mail, MessageCircle } from 'lucide-react';

const ReturnsExchangePage = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Reach out within 48 hours of delivery",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600"
    },
    {
      step: 2,
      title: "Return Authorization",
      description: "We'll provide a return authorization number",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600"
    },
    {
      step: 3,
      title: "Package & Ship",
      description: "Pack items securely and ship back to us",
      icon: Package,
      color: "bg-purple-100 text-purple-600"
    },
    {
      step: 4,
      title: "Refund Processing",
      description: "Refund processed within 5-7 business days",
      icon: RotateCcw,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const returnConditions = [
    {
      condition: "Unopened Packages",
      description: "Hair must be in original, unopened packaging",
      icon: CheckCircle,
      status: "eligible"
    },
    {
      condition: "48-Hour Window",
      description: "Return request must be made within 48 hours of delivery",
      icon: Clock,
      status: "eligible"
    },
    {
      condition: "Original Condition",
      description: "Items must be unused and in original condition",
      icon: Package,
      status: "eligible"
    },
    {
      condition: "Opened Packages",
      description: "Once opened, hair cannot be returned for hygiene reasons",
      icon: AlertTriangle,
      status: "not-eligible"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Exchange Policy</h1>
          <p className="text-xl text-purple-100">
            Your satisfaction is our priority - easy returns within 48 hours
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Policy Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">48-Hour Return Policy</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
            <p className="text-lg text-blue-800 leading-relaxed">
              We offer a <strong>48-hour return window</strong> from the time of delivery for unopened packages only. 
              Due to hygiene regulations, once hair packages are opened, they cannot be returned or exchanged.
            </p>
          </div>

          {/* Return Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {returnConditions.map((condition, index) => (
              <div key={index} className={`rounded-xl p-6 border-2 ${
                condition.status === 'eligible' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    condition.status === 'eligible' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    <condition.icon size={24} className={
                      condition.status === 'eligible' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    } />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-2 ${
                      condition.status === 'eligible' 
                        ? 'text-green-900' 
                        : 'text-red-900'
                    }`}>
                      {condition.condition}
                    </h3>
                    <p className={
                      condition.status === 'eligible' 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }>
                      {condition.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Return Your Order</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <step.icon size={24} />
                </div>
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Policy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">What Can Be Exchanged</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Unopened packages within 48 hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Different color or length (same price range)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Defective or damaged items</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Exchange Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <span className="text-gray-700">Contact our support team</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <span className="text-gray-700">Receive exchange authorization</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <span className="text-gray-700">Ship original item back</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <span className="text-gray-700">Receive replacement item</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle size={24} className="mr-2 text-yellow-600" />
            Important Notes
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span><strong>Hygiene Policy:</strong> For health and safety reasons, opened hair packages cannot be returned or exchanged.</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span><strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the item is defective.</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span><strong>Refund Timeline:</strong> Refunds are processed within 5-7 business days after we receive the returned item.</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span><strong>Original Payment Method:</strong> Refunds will be issued to the original payment method used for purchase.</span>
            </p>
          </div>
        </div>

        {/* Contact for Returns */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need to Return or Exchange?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help you with returns and exchanges. 
            Contact us as soon as possible for the fastest resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+33634549649?text=Hi! I need help with a return or exchange."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Support</span>
            </a>
            <a
              href="mailto:anaroyes7@gmail.com?subject=Return/Exchange Request"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Email Support</span>
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Average response time: Under 2 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchangePage;