import React from 'react';

const ItemProperties = ({ selectedProduct }) => {
  const properties = selectedProduct?.property || [];

  // --- No Properties State Enhancement ---
  if (!properties.length) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full text-center">
        <p className="text-gray-500 italic text-base">
          No detailed item specifications available.
        </p>
      </div>
    );
  }

  // --- Main Component Enhancement ---
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full mt-5">
      {/* Title with improved separation */}
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
        Item Specifications
      </h2>
      
      {/* Enhanced grid layout for two columns. 
        Using a standard map directly over the array and a 2-column grid 
        is cleaner than the reduce/pair logic, letting Tailwind handle the flow.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {properties.map((item, index) => (
          // Use a definition list-like structure (Key: Value) for clarity
          <div key={index} className="flex flex-col text-sm">
            {/* Property Name (Key) - bolder, slightly darker */}
            <dt className="font-semibold text-gray-600 uppercase tracking-wider mb-0.5">
              {item.attr_name}
            </dt>
            
            {/* Property Value - clearly stands out */}
            <dd className="text-base text-gray-800 break-words">
              {item.attr_value || 'N/A'} 
            </dd>
          </div>
        ))}
      </div>

      {/* Optional HTML Detail (uncomment if needed) */}
      {/* {selectedProduct.detail && (
        <>
          <div className="mt-8 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
            <div 
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: selectedProduct.detail }} 
            />
          </div>
        </>
      )} */}
    </div>
  );
};

export default ItemProperties;