import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 animate-pulse min-h-screen">
      {/* Left - Image gallery */}
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-300 rounded-md"></div>
          ))}
        </div>
        <div className="w-96 h-96 bg-gray-300 rounded-md"></div>
      </div>

      {/* Right - Product details */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

        {/* Price */}
        <div className="h-6 w-1/4 bg-gray-300 rounded"></div>

        {/* Options (color, ship from, frame) */}
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-1/2 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Quantity & buttons */}
        <div className="flex gap-4 mt-4">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Shipping & other info */}
        <div className="flex flex-col gap-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
