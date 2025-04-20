import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/product/');
      const data = await response.json();
      setProducts(data);
      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleViewProduct = (product) => {
    console.log('Selected product:', product);
    // You can open a modal or navigate to an edit page
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <ProductList products={products} onView={handleViewProduct} />
    </div>
  );
};

export default ProductListPage;
