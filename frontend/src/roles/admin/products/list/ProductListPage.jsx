import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../../features/productSlice';
import Loader from '../../../../components/Loader';
import { Routes, Route } from 'react-router-dom';
import ProductViewPage from './ProductViewPage';

const ProductListPage = () => { 
  const products = useSelector((state) => state.products.products); 
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(fetchProducts({country: "BD", currency: "BDT"}));
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Products from Redux:', products);
    if (products.length > 0) {
      console.log('First product structure:', products[0]);
    }
  }, [products]);

  if (status === 'loading') {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Failed to load products</h3>
              <p className="text-red-700">{error || 'An error occurred while loading products'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <Routes>
      <Route path="/" element={<ProductList products={products} />} />
      <Route path="/view/:id" element={<ProductViewPage />} />
    </Routes>
  );
};

export default ProductListPage;
