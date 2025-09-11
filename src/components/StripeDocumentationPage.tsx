
import { CreditCard, Shield, Lock, CheckCircle,  Globe, Smartphone } from 'lucide-react';

const StripeDocumentationPage = () => {
  // const testCards = [
  //   {
  //     number: "4242 4242 4242 4242",
  //     brand: "Visa",
  //     result: "Payment succeeds",
  //     cvc: "Any 3 digits",
  //     expiry: "Any future date"
  //   },
  //   {
  //     number: "4000 0000 0000 0002",
  //     brand: "Visa",
  //     result: "Payment declined",
  //     cvc: "Any 3 digits", 
  //     expiry: "Any future date"
  //   },
  //   {
  //     number: "4000 0025 0000 3155",
  //     brand: "Visa",
  //     result: "Requires authentication",
  //     cvc: "Any 3 digits",
  //     expiry: "Any future date"
  //   },
  //   {
  //     number: "5555 5555 5555 4444",
  //     brand: "Mastercard",
  //     result: "Payment succeeds",
  //     cvc: "Any 3 digits",
  //     expiry: "Any future date"
  //   },
  //   {
  //     number: "3782 822463 10005",
  //     brand: "American Express",
  //     result: "Payment succeeds",
  //     cvc: "Any 4 digits",
  //     expiry: "Any future date"
  //   }
  // ];

  const securityFeatures = [
    {
      feature: "PCI DSS Level 1",
      description: "Highest level of payment security certification",
      icon: Shield
    },
    {
      feature: "3D Secure 2.0",
      description: "Advanced authentication for card payments",
      icon: Lock
    },
    {
      feature: "Machine Learning",
      description: "AI-powered fraud detection and prevention",
      icon: Globe
    },
    {
      feature: "Real-time Monitoring",
      description: "24/7 transaction monitoring and alerts",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Stripe Payment Documentation</h1>
          <p className="text-xl text-blue-100">
            Secure, reliable payment processing powered by Stripe
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Processing Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Why We Use Stripe</h3>
              <p className="text-gray-700 mb-4">
                Stripe is a leading payment processor trusted by millions of businesses worldwide. 
                We chose Stripe for its robust security, reliability, and excellent user experience.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Industry-leading security standards</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Support for 135+ currencies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Advanced fraud protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Instant payment processing</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Supported Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CreditCard size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Credit & Debit Cards</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Smartphone size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium">Digital Wallets</p>
                    <p className="text-sm text-gray-600">Apple Pay, Google Pay</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Globe size={20} className="text-purple-600" />
                  <div>
                    <p className="font-medium">Local Payment Methods</p>
                    <p className="text-sm text-gray-600">SEPA, iDEAL, Bancontact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Security Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.feature}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Mode Information
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle size={24} className="mr-2 text-blue-600" />
            Test Mode Information
          </h2>
          
          <div className="bg-white rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Our website is currently running in <strong>test mode</strong> for demonstration purposes. 
              This means you can test the payment flow without being charged real money.
            </p>
            <p className="text-blue-800 font-medium">
              Use the test card numbers below to simulate different payment scenarios:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-bold">Card Number</th>
                  <th className="px-4 py-3 text-left font-bold">Brand</th>
                  <th className="px-4 py-3 text-left font-bold">Result</th>
                  <th className="px-4 py-3 text-left font-bold">CVC</th>
                  <th className="px-4 py-3 text-left font-bold">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {testCards.map((card, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-mono text-sm">{card.number}</td>
                    <td className="px-4 py-3">{card.brand}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.result.includes('succeeds') 
                          ? 'bg-green-100 text-green-800'
                          : card.result.includes('declined')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {card.result}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{card.cvc}</td>
                    <td className="px-4 py-3 text-sm">{card.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* Data Protection */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Protection & Privacy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">What Information We Collect</h3>
              <p className="text-gray-700 mb-4">
                When you make a payment through Stripe, we collect only the information necessary to process your transaction:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Billing address</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Email address</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Transaction amount</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Purchase details</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-3">How We Protect Your Data</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Shield size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>We never store your complete card details on our servers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Lock size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>All data is encrypted in transit and at rest</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Regular security audits and compliance checks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Globe size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>GDPR compliant data processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeDocumentationPage;