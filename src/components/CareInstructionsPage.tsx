import React from 'react';
import { Droplets, Sun, Moon, Scissors, Heart } from 'lucide-react';

const CareInstructionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hair Care Instructions</h1>
          <p className="text-xl text-green-100">
            Keep your Afro Kinky Bulk Hair looking beautiful for months
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Daily Care */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Sun size={24} className="mr-2 text-yellow-600" />
            Daily Care Routine
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Morning Routine</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Gently finger-detangle any knots</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Apply light leave-in conditioner</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Style as desired</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Use natural oils sparingly</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Evening Routine</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Wrap hair in silk or satin scarf</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Use satin pillowcase</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Avoid cotton materials</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Secure loose styles gently</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Washing Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Droplets size={24} className="mr-2 text-blue-600" />
            Washing Instructions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Frequency</h3>
              <p className="text-gray-700">
                Wash every 1-2 weeks or as needed. Over-washing can dry out the hair.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Step-by-Step Process</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Pre-rinse with lukewarm water</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Apply sulfate-free shampoo gently</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Rinse thoroughly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <span>Apply deep conditioner</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</span>
                    <span>Leave for 15-20 minutes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">6</span>
                    <span>Rinse with cool water</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Recommended Products</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Sulfate-free shampoo</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Deep conditioning mask</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Leave-in conditioner</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Natural oils (coconut, argan)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Wide-tooth comb</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Styling Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Scissors size={24} className="mr-2 text-purple-600" />
            Styling & Maintenance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Do's</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Use heat protectant before styling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Keep heat settings low (under 350°F)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Moisturize regularly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Trim ends when needed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Store properly when not wearing</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Don'ts</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don't use excessive heat</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don't brush when wet</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don't use harsh chemicals</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don't sleep on cotton pillowcases</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span>Don't pull or tug aggressively</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Longevity Tips */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart size={24} className="mr-2 text-pink-600" />
            Maximize Hair Longevity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon size={24} className="text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Night Protection</h3>
              <p className="text-gray-600 text-sm">
                Always protect your hair at night with silk/satin materials
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Regular Moisture</h3>
              <p className="text-gray-600 text-sm">
                Keep hair hydrated with quality leave-in conditioners
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Gentle Handling</h3>
              <p className="text-gray-600 text-sm">
                Treat your hair gently to prevent damage and breakage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareInstructionsPage;