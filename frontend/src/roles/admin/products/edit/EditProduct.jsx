import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, clearSelectedProduct } from '../../../../features/productSlice';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.selectedProduct || {});
  const status = useSelector((state) => state.products.status);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (id) dispatch(fetchProductById({ id, country: 'US', currency: 'USD' }));
    return () => dispatch(clearSelectedProduct());
  }, [id, dispatch]);

  const handleSave = () => {
    navigate(-1);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'skus', label: 'SKUs & Variants', icon: '📦' },
    { id: 'properties', label: 'Properties', icon: '🏷️' },
    { id: 'description', label: 'Description', icon: '📄' },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <h3 className="text-lg font-semibold text-slate-700">Loading Product...</h3>
            <p className="text-sm text-slate-500 text-center">Please wait while we fetch the product details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !product.productId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Product Not Found</h3>
            <p className="text-sm text-slate-500 text-center">The product you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
                <p className="text-slate-600">Update product information and settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                ID: {product.productId}
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <ProductForm 
            product={product} 
            onSave={handleSave} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;