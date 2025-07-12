import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../../features/productSlice';

const ProductForm = ({ product, onSave, activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: product?.name || '',
    images: product?.images ? [...product.images] : [''],
    skus: product?.skus ? JSON.parse(JSON.stringify(product.skus)) : [],
    property: product?.property ? JSON.parse(JSON.stringify(product.property)) : [],
    description: product?.description || '',
  });
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  // Handlers for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Images with drag and drop
  const handleImageChange = (idx, value) => {
    const images = [...form.images];
    images[idx] = value;
    setForm((prev) => ({ ...prev, images }));
  };

  const addImage = () => setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
  
  const removeImage = (idx) => setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null) return;
    
    const images = [...form.images];
    const draggedImage = images[dragIndex];
    images.splice(dragIndex, 1);
    images.splice(dropIndex, 0, draggedImage);
    setForm((prev) => ({ ...prev, images }));
    setDragIndex(null);
  };

  // SKUs
  const handleSkuChange = (idx, key, value) => {
    const skus = [...form.skus];
    skus[idx][key] = value;
    setForm((prev) => ({ ...prev, skus }));
  };

  const addSku = () => setForm((prev) => ({ 
    ...prev, 
    skus: [...prev.skus, { 
      sku_attr: '', 
      offer_sale_price: '', 
      sku_id: '', 
      price_include_tax: false, 
      currency_code: '', 
      sku_price: '', 
      offer_bulk_sale_price: '', 
      sku_available_stock: '', 
      id: '', 
      ae_sku_property_dtos: { ae_sku_property_d_t_o: [] }, 
      original_price: '', 
      converted_currency: '' 
    }] 
  }));

  const removeSku = (idx) => setForm((prev) => ({ ...prev, skus: prev.skus.filter((_, i) => i !== idx) }));

  // SKU Properties
  const handleSkuPropChange = (skuIdx, propIdx, key, value) => {
    const skus = [...form.skus];
    skus[skuIdx].ae_sku_property_dtos.ae_sku_property_d_t_o[propIdx][key] = value;
    setForm((prev) => ({ ...prev, skus }));
  };

  const addSkuProp = (skuIdx) => {
    const skus = [...form.skus];
    skus[skuIdx].ae_sku_property_dtos.ae_sku_property_d_t_o.push({ 
      sku_property_value: '', 
      sku_image: '', 
      sku_property_name: '', 
      property_value_definition_name: '', 
      property_value_id: '', 
      sku_property_id: '' 
    });
    setForm((prev) => ({ ...prev, skus }));
  };

  const removeSkuProp = (skuIdx, propIdx) => {
    const skus = [...form.skus];
    skus[skuIdx].ae_sku_property_dtos.ae_sku_property_d_t_o.splice(propIdx, 1);
    setForm((prev) => ({ ...prev, skus }));
  };

  // Property
  const handlePropertyChange = (idx, key, value) => {
    const property = [...form.property];
    property[idx][key] = value;
    setForm((prev) => ({ ...prev, property }));
  };

  const addProperty = () => setForm((prev) => ({ 
    ...prev, 
    property: [...prev.property, { attr_name_id: '', attr_value_id: '', attr_name: '', attr_value: '' }] 
  }));

  const removeProperty = (idx) => setForm((prev) => ({ ...prev, property: prev.property.filter((_, i) => i !== idx) }));

  // Save
  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateProduct({ 
        id: product.productId, 
        data: {
          ...product,
          name: form.name,
          images: form.images,
          skus: form.skus,
          property: form.property,
          description: form.description,
        }
      })).unwrap();
      if (onSave) onSave();
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  const renderBasicInfo = () => (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Product ID</label>
            <input
              type="text"
              value={product.productId || ''}
              disabled
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-green-700 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Product Images</h3>
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Image</span>
          </button>
        </div>

        <div className="space-y-4">
          {form.images.map((img, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx)}
              className={`p-4 border-2 border-dashed rounded-xl transition-all ${
                dragIndex === idx ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    {img ? (
                      <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Image URL"
                    value={img}
                    onChange={e => handleImageChange(idx, e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSKUs = () => (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">SKUs & Variants</h3>
        <button
          type="button"
          onClick={addSku}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add SKU</span>
        </button>
      </div>

      <div className="space-y-6">
        {form.skus.map((sku, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">SKU #{idx + 1}</h4>
              <button
                type="button"
                onClick={() => removeSku(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">SKU Attribute</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SKU Attribute"
                  value={sku.sku_attr}
                  onChange={e => handleSkuChange(idx, 'sku_attr', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sale Price</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Sale Price"
                  value={sku.offer_sale_price}
                  onChange={e => handleSkuChange(idx, 'offer_sale_price', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">SKU ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SKU ID"
                  value={sku.sku_id}
                  onChange={e => handleSkuChange(idx, 'sku_id', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Available Stock"
                  value={sku.sku_available_stock}
                  onChange={e => handleSkuChange(idx, 'sku_available_stock', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Original Price</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Original Price"
                  value={sku.original_price}
                  onChange={e => handleSkuChange(idx, 'original_price', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Currency Code"
                  value={sku.currency_code}
                  onChange={e => handleSkuChange(idx, 'currency_code', e.target.value)}
                />
              </div>
            </div>

            {/* SKU Properties */}
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-slate-900">SKU Properties</h5>
                <button
                  type="button"
                  onClick={() => addSkuProp(idx)}
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
                >
                  Add Property
                </button>
              </div>
              
              <div className="space-y-3">
                {sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((prop, pidx) => (
                  <div key={pidx} className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Property Name"
                        value={prop.sku_property_name}
                        onChange={e => handleSkuPropChange(idx, pidx, 'sku_property_name', e.target.value)}
                      />
                      <input
                        type="text"
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Property Value"
                        value={prop.sku_property_value}
                        onChange={e => handleSkuPropChange(idx, pidx, 'sku_property_value', e.target.value)}
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Image URL"
                          value={prop.sku_image}
                          onChange={e => handleSkuPropChange(idx, pidx, 'sku_image', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeSkuProp(idx, pidx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Product Properties</h3>
        <button
          type="button"
          onClick={addProperty}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Property</span>
        </button>
      </div>

      <div className="space-y-4">
        {form.property.map((prop, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Property Name"
                  value={prop.attr_name}
                  onChange={e => handlePropertyChange(idx, 'attr_name', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Property Value"
                  value={prop.attr_value}
                  onChange={e => handlePropertyChange(idx, 'attr_value', e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeProperty(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDescription = () => (
    <div className="p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Product Description</label>
        <textarea
          name="description"
          rows={12}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Enter detailed product description..."
          value={form.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicInfo();
      case 'images':
        return renderImages();
      case 'skus':
        return renderSKUs();
      case 'properties':
        return renderProperties();
      case 'description':
        return renderDescription();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
      
      {/* Save Button */}
      <div className="border-t border-slate-200 bg-slate-50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('basic')}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded-xl transition-colors flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
