import React from 'react';
import { Ruler, Info, CheckCircle } from 'lucide-react';

const SizeGuidePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hair Length Size Guide</h1>
          <p className="text-xl text-gray-300">
            Find the perfect length for your style
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Size Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Ruler size={24} className="mr-2 text-blue-600" />
            Hair Length Guide
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Length</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Inches</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Best For</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-bold">Style Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold">Short</td>
                  <td className="border border-gray-200 px-4 py-3">10" - 12"</td>
                  <td className="border border-gray-200 px-4 py-3">Shoulder length styles</td>
                  <td className="border border-gray-200 px-4 py-3">Bob cuts, short locs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold">Medium</td>
                  <td className="border border-gray-200 px-4 py-3">14" - 16"</td>
                  <td className="border border-gray-200 px-4 py-3">Most popular choice</td>
                  <td className="border border-gray-200 px-4 py-3">Braids, twists, medium locs</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold">Long</td>
                  <td className="border border-gray-200 px-4 py-3">18" - 20"</td>
                  <td className="border border-gray-200 px-4 py-3">Statement styles</td>
                  <td className="border border-gray-200 px-4 py-3">Long braids, goddess locs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold">Extra Long</td>
                  <td className="border border-gray-200 px-4 py-3">22" - 24"</td>
                  <td className="border border-gray-200 px-4 py-3">Dramatic looks</td>
                  <td className="border border-gray-200 px-4 py-3">Floor-length styles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How Much Hair You Need */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Much Hair Do You Need?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">3 Packs</h3>
              <p className="text-gray-600">For thin to medium density hair</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">4 Packs</h3>
              <p className="text-gray-600">Most popular choice - full head</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">5+</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">5+ Packs</h3>
              <p className="text-gray-600">For thick, full styles</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Info size={24} className="mr-2 text-yellow-600" />
            Pro Tips
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Always buy extra hair - it's better to have too much than too little</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Consider your head size and desired fullness when choosing quantity</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Longer lengths require more hair for the same fullness</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">Contact us if you're unsure - we're happy to help!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;