import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'products', name: 'Products' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'payment', name: 'Payment' },
    { id: 'returns', name: 'Returns' },
    { id: 'care', name: 'Hair Care' }
  ];

  const faqs = [
    {
      category: 'products',
      question: "What is Afro Kinky Bulk Hair?",
      answer: "Afro Kinky Bulk Hair is 100% premium human hair with a natural kinky texture that perfectly mimics African textured hair. It's unprocessed, chemical-free, and ideal for braiding, twisting, dreadlocks, and other protective hairstyles. Our hair maintains its natural texture and can be styled, colored, and treated like your own hair."
    },
    {
      category: 'products',
      question: "How much hair do I need for a full head?",
      answer: "For a full head installation, we recommend 3-4 packs of our Afro Kinky Bulk Hair. The exact amount depends on your desired fullness, head size, and styling method. For thicker styles or longer lengths, you might need 4-5 packs. Our customer service team can help you determine the right amount for your specific needs."
    },
    {
      category: 'products',
      question: "What lengths are available?",
      answer: "We offer Afro Kinky Bulk Hair in lengths from 10\" to 22\". The most popular lengths are 14\", 16\", 18\", and 20\". Each length is carefully measured and cut to ensure consistency. Longer lengths are perfect for dramatic styles, while shorter lengths are great for natural, everyday looks."
    },
    {
      category: 'products',
      question: "Can I color or dye the hair?",
      answer: "Yes! Since our Afro Kinky Bulk Hair is 100% human hair, it can be colored or dyed. However, we recommend going darker rather than lighter to maintain the hair's integrity. For best results, have a professional colorist perform any chemical treatments. Always do a strand test first and use quality hair products."
    },
    {
      category: 'shipping',
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! We offer free shipping to France (orders over €50), Europe (orders over €75), UK (orders over €100), US & Canada (orders over €150), and rest of world (orders over €200). Delivery times vary by location: 2-3 days for France, 3-7 days for EU, 5-8 days for UK, 7-12 days for US/Canada, and 10-21 days for other countries."
    },
    {
      category: 'shipping',
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. We use reliable shipping partners including La Poste, DHL, and FedEx depending on your location."
    },
    {
      category: 'shipping',
      question: "What if my package is lost or damaged?",
      answer: "If your package is lost during shipping or arrives damaged, please contact us immediately. We'll work with the shipping carrier to resolve the issue and ensure you receive your order. For damaged packages, please take photos and contact us within 48 hours of delivery."
    },
    {
      category: 'payment',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, PayPal Pay Later, and bank transfers (SEPA for EU customers). All payments are processed securely with SSL encryption and 3D Secure authentication for card payments."
    },
    {
      category: 'payment',
      question: "Is my payment information secure?",
      answer: "Absolutely! We use industry-leading security measures including SSL encryption, PCI DSS compliance, and 3D Secure authentication. We never store your payment information on our servers. All transactions are processed through secure payment gateways like Stripe and PayPal."
    },
    {
      category: 'payment',
      question: "Can I pay in installments?",
      answer: "Yes! We offer PayPal Pay Later which allows you to split your purchase into 4 interest-free payments. This option is available at checkout for qualifying orders. You can also use your PayPal Credit if you have it set up."
    },
    {
      category: 'returns',
      question: "What is your return policy?",
      answer: "We offer a 48-hour return window from delivery for unopened packages only. Due to hygiene regulations, once hair packages are opened, they cannot be returned. Items must be in original condition with all packaging. Return shipping costs are covered by the customer unless the item is defective."
    },
    {
      category: 'returns',
      question: "How do I start a return?",
      answer: "To start a return, contact us within 48 hours of delivery via WhatsApp (+33 6 34 54 96 49) or email (anaroyes7@gmail.com). We'll provide you with a return authorization number and instructions. Please include your order number and reason for return."
    },
    {
      category: 'returns',
      question: "How long does it take to get my refund?",
      answer: "Once we receive your returned item and verify its condition, refunds are processed within 5-7 business days. The refund will be issued to your original payment method. Bank processing times may vary, but most customers see the refund within 3-5 business days after processing."
    },
    {
      category: 'care',
      question: "How should I care for Afro Kinky Bulk Hair?",
      answer: "Care for your Afro Kinky Bulk Hair like you would your natural hair. Use sulfate-free shampoos, deep condition regularly (every 1-2 weeks), and moisturize with natural oils like coconut or argan oil. Avoid excessive heat styling and always use heat protectant when styling. Sleep with a silk or satin pillowcase or bonnet."
    },
    {
      category: 'care',
      question: "How long does the hair last?",
      answer: "With proper care and maintenance, our Afro Kinky Bulk Hair can last 6-12 months or even longer. The longevity depends on how well you care for it, how often you manipulate it, and your maintenance routine. Regular moisturizing, gentle handling, and proper storage will extend the life of your hair."
    },
    {
      category: 'care',
      question: "Can I swim with the hair?",
      answer: "Yes, you can swim with Afro Kinky Bulk Hair, but we recommend protecting it. Before swimming, apply a leave-in conditioner or natural oil to create a barrier. After swimming, rinse thoroughly with fresh water and deep condition to remove chlorine or salt. Consider wearing a swim cap for extended pool time."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-indigo-100">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-bold text-lg text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === index ? (
                  <ChevronUp className="text-gray-500 flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-500 flex-shrink-0" size={24} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed text-lg pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Show All Questions
            </button>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our expert team is here to help you with any questions about our products or services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://wa.me/+33634549649?text=Hi! I have a question about your products."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </a>
            <a
              href="mailto:anaroyes7@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
            <a
              href="tel:+33634549649"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Call</span>
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Response time: Under 2 hours via WhatsApp • 24 hours via email
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;