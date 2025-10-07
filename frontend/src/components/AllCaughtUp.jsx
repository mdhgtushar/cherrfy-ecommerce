import React from "react";

const AllCaughtUp = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl text-center space-y-4">
      
      {/* Icon */}
      <div className="text-6xl text-green-500 mb-2 animate-bounce">
        🛒
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-semibold text-gray-800">
        You are all caught up!
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 max-w-xs">
        No more products to show for now. Check back later for new arrivals!
      </p>

      {/* Optional CTA button */}
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
        Explore Categories
      </button>
    </div>
  );
};

export default AllCaughtUp;
