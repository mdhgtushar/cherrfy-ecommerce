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
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error || 'Failed to load products'}</span>
        </div>
      </div>
    );
  }
 
  return (
    <Routes>
      <Route path="/" element={
        <div className="p-2">
          <h1 className="text-2xl font-bold mb-6">Product List</h1>
          <ProductList products={products} />
        </div>
      } />
      <Route path="/view/:id" element={<ProductViewPage />} />
    </Routes>
  );
};

export default ProductListPage;
