import React from 'react';
import { Cookie, Shield, Settings, CheckCircle, Mail, Eye, BarChart, Globe } from 'lucide-react';

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      type: "Essential Cookies",
      icon: Shield,
      description: "These cookies are necessary for the website to function properly. They enable basic features like page navigation, access to secure areas, and shopping cart functionality.",
      examples: ["Session management", "Security tokens", "Shopping cart state", "User preferences"],
      canDisable: false,
      color: "bg-green-100 text-green-600"
    },
    {
      type: "Performance Cookies",
      icon: BarChart,
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Google Analytics", "Page load times", "User behavior tracking", "Error reporting"],
      canDisable: true,
      color: "bg-blue-100 text-blue-600"
    },
    {
      type: "Functional Cookies",
      icon: Settings,
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: ["Language preferences", "Currency selection", "Wishlist items", "Recently viewed products"],
      canDisable: true,
      color: "bg-purple-100 text-purple-600"
    },
    {
      type: "Marketing Cookies",
      icon: Eye,
      description: "These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.",
      examples: ["Facebook Pixel", "Google Ads", "Retargeting pixels", "Social media integration"],
      canDisable: true,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const thirdPartyServices = [
    {
      service: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Page views, user behavior, demographics",
      retention: "26 months",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      service: "Stripe",
      purpose: "Payment processing and fraud prevention",
      dataCollected: "Payment information, transaction data",
      retention: "7 years (legal requirement)",
      optOut: "Cannot opt out for payment processing"
    },
    {
      service: "PayPal",
      purpose: "Alternative payment processing",
      dataCollected: "Payment information, account data",
      retention: "Per PayPal's privacy policy",
      optOut: "Cannot opt out for payment processing"
    },
    {
      service: "Facebook/Meta",
      purpose: "Social media integration and advertising",
      dataCollected: "Page interactions, ad engagement",
      retention: "Per Facebook's data policy",
      optOut: "Facebook Ad Preferences"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-amber-100">
            How we use cookies to improve your browsing experience
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better browsing experience by remembering your preferences, 
              keeping you logged in, and helping us understand how you use our site.
            </p>
            <p className="mb-4">
              This Cookie Policy explains what cookies we use, why we use them, and how you can manage your cookie preferences.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Last updated:</strong> January 2024
            </p>
          </div>
        </div>

        {/* Types of Cookies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${cookie.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <cookie.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{cookie.type}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cookie.canDisable 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cookie.canDisable ? 'Optional' : 'Required'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{cookie.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-gray-600">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third Party Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
          <p className="text-gray-700 mb-8">
            We work with trusted third-party services to provide you with the best possible experience. 
            Here's information about the external services we use:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Service</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Purpose</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Data Collected</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Retention</th>
                </tr>
              </thead>
              <tbody>
                {thirdPartyServices.map((service, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 px-4 py-3 font-semibold">{service.service}</td>
                    <td className="border border-gray-200 px-4 py-3">{service.purpose}</td>
                    <td className="border border-gray-200 px-4 py-3">{service.dataCollected}</td>
                    <td className="border border-gray-200 px-4 py-3">{service.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cookie Management */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>View and delete existing cookies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Block cookies from specific websites</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Block third-party cookies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Clear all cookies when closing browser</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Opt-Out Links</h3>
              <p className="text-gray-700 mb-4">
                You can opt out of specific tracking services:
              </p>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.facebook.com/settings?tab=ads" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <a 
                    href="http://optout.aboutads.info/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Digital Advertising Alliance Opt-out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Basis & Your Rights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">GDPR Compliance</h3>
              <p className="text-gray-700 mb-4">
                Under the General Data Protection Regulation (GDPR), you have the right to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Know what data we collect</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Correct inaccurate data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Request data deletion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <span>Withdraw consent</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <p className="text-gray-700 mb-4">
                For questions about our cookie policy or to exercise your rights:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:anaroyes7@gmail.com" className="text-blue-600 hover:underline">
                      anaroyes7@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">Montpellier, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CookiePolicyPage;