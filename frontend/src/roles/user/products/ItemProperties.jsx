import React from 'react';

const ItemProperties = ({ selectedProduct }) => {
  const properties = selectedProduct?.property || [];

  if (!properties.length) {
    return (
      <div className="bg-white p-4 w-full text-gray-500 italic">
        No item properties available.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Item Properties
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {properties
          .reduce((rows, item, index) => {
            if (index % 2 === 0) rows.push([item]);
            else rows[rows.length - 1].push(item);
            return rows;
          }, [])
          .map((pair, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">{pair[0]?.attr_name}:</span>
                <span className="ml-2 text-gray-800">{pair[0]?.attr_value}</span>
              </div>

              {pair[1] && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">{pair[1]?.attr_name}:</span>
                  <span className="ml-2 text-gray-800">{pair[1]?.attr_value}</span>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>

      {/* Optional HTML Detail (uncomment if needed) */}
      {/* {selectedProduct.detail && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
          <div dangerouslySetInnerHTML={{ __html: selectedProduct.detail }} />
        </div>
      )} */}
    </div>
  );
};

export default ItemProperties;
