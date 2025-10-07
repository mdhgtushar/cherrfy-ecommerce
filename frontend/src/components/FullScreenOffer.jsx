import React, { useState, useEffect } from "react";

const ModernEcomPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
 

  const handleClose = () => {
    setShowPopup(false); 
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="fixed bottom-6 right-6 pointer-events-auto max-w-sm w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 animate-slideIn">
          {/* Image + Badge */}
          <div className="relative">
            <img
              src="https://ae01.alicdn.com/kf/Sa7ded93ea16341a9a39b513fdcd7b37dB.jpg"
              alt="Offer"
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              20% OFF
            </span>
          </div>

          {/* Content */}
          <div className="p-5 text-center">
            <h2 className="text-xl font-extrabold mb-2 animate-bounce">
              Limited Time Deal!
            </h2>
            <p className="text-gray-700 mb-4">
              Get 20% off on your first order. Only for today!
            </p>
            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-5 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Claim Now
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
          >
            ×
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            0% {transform: translateY(100%) scale(0.8); opacity: 0;}
            100% {transform: translateY(0) scale(1); opacity: 1;}
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ModernEcomPopup;
