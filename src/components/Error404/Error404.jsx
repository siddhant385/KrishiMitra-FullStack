import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Home, RefreshCw, HelpCircle } from 'lucide-react';

export default function FarmerErrorPage() {
  const navigate = useNavigate();
  const [errorCode] = React.useState('404');
  const [errorMessage] = React.useState('खेत में रास्ता नहीं मिला!');
  const [errorDescription] = React.useState('जो पेज आप ढूंढ रहे हैं वो खेत में कहीं खो गया है।');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-green-600 relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100,20 Q120,40 100,60 Q80,40 100,20 M100,60 L100,120 M80,80 L120,80 M70,100 L130,100" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                    className="text-green-600"/>
            </svg>
          </div>

          {/* Tractor Icon */}
          <div className="text-center mb-6">
            <div className="inline-block p-6 bg-green-100 rounded-full mb-4 animate-bounce">
              <svg 
                className="w-20 h-20 text-green-700" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="7" cy="17" r="3" />
                <circle cx="17" cy="17" r="3" />
                <path d="M5 17H2v-4M2 5h11v8" />
                <path d="M13 7h5l2 4h-2" />
              </svg>
            </div>
            <h1 className="text-7xl font-bold text-green-700 mb-2">{errorCode}</h1>
            <h2 className="text-3xl font-bold text-green-900 mb-2">{errorMessage}</h2>
            <p className="text-gray-600 text-lg">{errorDescription}</p>
          </div>

          {/* Alert Box */}
          <Alert className="mb-6 border-green-600 bg-green-50">
            <HelpCircle className="h-5 w-5 text-green-700" />
            <AlertTitle className="text-green-900 font-bold">क्या हुआ?</AlertTitle>
            <AlertDescription className="text-gray-700">
              यह पेज उपलब्ध नहीं है या हटा दिया गया है। कृपया URL जाँचें या होम पेज पर वापस जाएं।
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <Home className="w-5 h-5" />
              होम पेज पर जाएं
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 bg-white hover:bg-green-50 text-green-700 font-bold py-4 px-6 rounded-xl border-2 border-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              पेज रीफ्रेश करें
            </button>
          </div>

          {/* Farming Tips Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-300">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              किसान टिप्स
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>मौसम के अनुसार फसल चुनें</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>मिट्टी की जांच नियमित रूप से करें</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>जैविक खाद का उपयोग बढ़ाएं</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
              <span className="text-2xl">🚜</span>
              <span>किसान के साथ, किसान के लिए</span>
              <span className="text-2xl">🌾</span>
            </p>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="w-12 h-12 bg-green-600 rounded-full opacity-20 animate-pulse"></div>
          <div className="w-12 h-12 bg-green-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}