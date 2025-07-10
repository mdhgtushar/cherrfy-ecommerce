import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (id) dispatch(fetchProductById({ id, country: 'US', currency: 'USD' }));
    return () => dispatch(clearSelectedProduct());
  }, [id, dispatch]);

  const handleSave = () => {
    navigate(-1); // Go back after save
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!product || !product.productId) return <div>Product not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <ProductForm product={product} onSave={handleSave} />
    </div>
  );
};

export default EditProduct;