import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../../features/productSlice';


const ProductListPage = () => { 
  const products = useSelector((state) => state.products.products); 
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(fetchProducts({country: "BD"}));
  }, [dispatch]);
 

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductListPage;
