// src/components/products/QuickViewModal.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ productData, onClose, onAddToCart }) => {
  // Effect to handle closing the modal with the 'Escape' key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // If no product data is provided, don't render the modal
  if (!productData) {
    return null;
  }
  
  // Destructure the needed properties from the passed data
  const { 
    name, 
    price, 
    imageUrl, 
    shortDescription, 
    availableStock, 
    id, // The product's main ID for the details link
  } = productData;

  const handleAddToCartClick = () => {
    onAddToCart(); // Call the passed-in handler
    onClose(); // Close the modal after adding to cart
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close modal on overlay click
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold"
          aria-label="Close quick view"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto rounded-lg object-contain max-h-96"
            />
          </div>
          <div className="md:w-1/2 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-orange-600 text-3xl font-bold mb-4">${price}</p>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              {shortDescription}
            </p>
            <p className={`text-sm font-medium mb-4 ${availableStock > 0 ? "text-green-600" : "text-red-600"}`}>
              {availableStock > 0 ? `In Stock (${availableStock})` : "Out of Stock"}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
              <button
                onClick={handleAddToCartClick}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={availableStock === 0}
              >
                Add to Cart
              </button>
              <Link to={`/products/${id}`} className="flex-1">
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                  View Full Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;