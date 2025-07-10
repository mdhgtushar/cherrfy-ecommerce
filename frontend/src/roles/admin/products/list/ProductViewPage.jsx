import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById, clearSelectedProduct } from '../../../../features/productSlice';
import Loader from '../../../../components/Loader';
import ADMIN_PATHS from '../../ADMIN_PATHS';

const ProductViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById({ id, country: 'BD', currency: 'BDT' }));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  if (status === 'loading' || !selectedProduct) return <Loader />;
  if (status === 'failed') return <div className="p-6 text-red-600">Failed to load product.</div>;

  // Fallbacks for title, image, price, etc.
  const title = selectedProduct.name || (selectedProduct.sku && selectedProduct.sku.sku_attr) || 'No title';
  const images = Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0
    ? selectedProduct.images
    : (selectedProduct.sku && selectedProduct.sku.ae_sku_property_dtos && selectedProduct.sku.ae_sku_property_dtos.ae_sku_property_d_t_o
      ? selectedProduct.sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((prop) => prop.sku_image).filter(Boolean)
      : []);
  const price = selectedProduct.price || (selectedProduct.sku && selectedProduct.sku.offer_sale_price) || 'N/A';
  const currency = selectedProduct.currency || (selectedProduct.sku && selectedProduct.sku.converted_currency) || '';
  const productId = selectedProduct.productId || (selectedProduct.sku && selectedProduct.sku.sku_id) || 'N/A';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <button className="mb-4 px-4 py-2 bg-neutral-100 rounded hover:bg-neutral-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => navigate(-1)} aria-label="Go back to product list">
         Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-semibold mb-2 text-neutral-900">Images</h4>
          <div className="grid grid-cols-2 gap-2">
            {images.length > 0 ? (
              images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${title} ${idx + 1}`}
                  className="w-full h-32 object-cover rounded border border-gray-200"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ))
            ) : (
              <div className="col-span-2 text-gray-400 text-center py-8">No images available</div>
            )}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-neutral-900">Product Information</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {title}</div>
            <div><strong>Product ID:</strong> {productId}</div>
            <div><strong>Price:</strong> {currency} {price}</div>
            <div><strong>Country:</strong> {selectedProduct.country}</div>
            <div><strong>Currency:</strong> {selectedProduct.currency}</div>
            {selectedProduct.rate && (
              <div><strong>Exchange Rate:</strong> {selectedProduct.rate}</div>
            )}
          </div>
          {selectedProduct.sku && (
            <div className="mt-4">
              <h5 className="font-semibold mb-2 text-neutral-900">SKU Details</h5>
              <div className="space-y-1 text-sm">
                <div><strong>SKU ID:</strong> {selectedProduct.sku.sku_id}</div>
                <div><strong>Original Price:</strong> {selectedProduct.sku.original_price}</div>
                <div><strong>Sale Price:</strong> {selectedProduct.sku.offer_sale_price}</div>
                <div><strong>Bulk Price:</strong> {selectedProduct.sku.offer_bulk_sale_price}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <a href={`https://www.aliexpress.com/item/${selectedProduct.productId}.html`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition text-center" aria-label="View on AliExpress">AliExpress</a>
        <Link to={`${ADMIN_PATHS.PRODUCTS.EDIT}${selectedProduct._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition text-center" aria-label="Edit Product">Edit Product</Link>
      </div>
    </div>
  );
};

export default ProductViewPage; 