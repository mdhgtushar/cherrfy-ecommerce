import React from "react";

const Loader = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 animate-pulse bg-white"
        >
          <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
