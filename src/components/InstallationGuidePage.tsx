import React from 'react';
import { Play, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const InstallationGuidePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Installation Guide</h1>
          <p className="text-xl text-purple-100">
            Step-by-step guide to install your Afro Kinky Bulk Hair
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Before You Start */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle size={24} className="text-yellow-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Before You Start</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>• Wash and condition your natural hair</li>
            <li>• Have all tools ready: comb, clips, hair ties</li>
            <li>• Work in good lighting</li>
            <li>• Allow 2-4 hours for installation</li>
          </ul>
        </div>

        {/* Installation Steps */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Installation Steps</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Prepare Your Hair</h3>
                  <p className="text-gray-600 mb-2">
                    Start with clean, detangled natural hair. Part your hair into small sections using clips.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Time: 15-20 minutes</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Section the Hair</h3>
                  <p className="text-gray-600 mb-2">
                    Create horizontal parts from ear to ear. Work from the bottom up for best results.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Time: 10-15 minutes</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Start Braiding/Twisting</h3>
                  <p className="text-gray-600 mb-2">
                    Take small sections of your natural hair and begin incorporating the bulk hair. 
                    Braid or twist according to your desired style.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Time: 2-3 hours</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Secure the Ends</h3>
                  <p className="text-gray-600 mb-2">
                    Secure each braid or twist with a small elastic or by burning the ends 
                    (for synthetic blends only).
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Time: 20-30 minutes</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Final Styling</h3>
                  <p className="text-gray-600 mb-2">
                    Style as desired. You can leave as individual braids, create updos, 
                    or style into protective patterns.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Time: 15-30 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-green-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle size={24} className="mr-2 text-green-600" />
              Pro Tips for Best Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Keep sections small and even for uniform look</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Don't braid too tightly to avoid tension</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Use a rat-tail comb for precise parting</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Take breaks to avoid hand fatigue</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Have someone help with hard-to-reach areas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Practice the technique before full installation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Tutorial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Visual Help?</h2>
            <p className="text-gray-600 mb-6">
              Watch our step-by-step video tutorial for detailed visual guidance
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2 mx-auto">
              <Play size={24} />
              <span>Watch Tutorial Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationGuidePage;