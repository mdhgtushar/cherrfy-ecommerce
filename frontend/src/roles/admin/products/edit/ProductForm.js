import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../../features/productSlice';

const ProductForm = ({ product, onSave }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: product?.name || '',
    images: product?.images ? [...product.images] : [''],
    skus: product?.skus ? JSON.parse(JSON.stringify(product.skus)) : [],
    property: product?.property ? JSON.parse(JSON.stringify(product.property)) : [],
    description: product?.description || '',
  });
  const [saving, setSaving] = useState(false);

  // Handlers for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Images
  const handleImageChange = (idx, value) => {
    const images = [...form.images];
    images[idx] = value;
    setForm((prev) => ({ ...prev, images }));
  };
  const addImage = () => setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
  const removeImage = (idx) => setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  // SKUs
  const handleSkuChange = (idx, key, value) => {
    const skus = [...form.skus];
    skus[idx][key] = value;
    setForm((prev) => ({ ...prev, skus }));
  };
  const addSku = () => setForm((prev) => ({ ...prev, skus: [...prev.skus, { sku_attr: '', offer_sale_price: '', sku_id: '', price_include_tax: false, currency_code: '', sku_price: '', offer_bulk_sale_price: '', sku_available_stock: '', id: '', ae_sku_property_dtos: { ae_sku_property_d_t_o: [] }, original_price: '', converted_currency: '' }] }));
  const removeSku = (idx) => setForm((prev) => ({ ...prev, skus: prev.skus.filter((_, i) => i !== idx) }));

  // SKU Properties
  const handleSkuPropChange = (skuIdx, propIdx, key, value) => {
    const skus = [...form.skus];
    skus[skuIdx].ae_sku_property_dtos.ae_sku_property_d_t_o[propIdx][key] = value;
    setForm((prev) => ({ ...prev, skus }));
  };
  const addSkuProp = (skuIdx) => {
    const skus = [...form.skus];
    skus[skuIdx].ae_sku_property_dtos.ae_sku_property_d_t_o.push({ sku_property_value: '', sku_image: '', sku_property_name: '', property_value_definition_name: '', property_value_id: '', sku_property_id: '' });
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
  const addProperty = () => setForm((prev) => ({ ...prev, property: [...prev.property, { attr_name_id: '', attr_value_id: '', attr_name: '', attr_value: '' }] }));
  const removeProperty = (idx) => setForm((prev) => ({ ...prev, property: prev.property.filter((_, i) => i !== idx) }));

  // Save
  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateProduct({ id: product.productId, data: {
        ...product,
        name: form.name,
        images: form.images,
        skus: form.skus,
        property: form.property,
        description: form.description,
      }})).unwrap();
      if (onSave) onSave();
    } catch (err) {
      // handle error (toast, etc)
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-neutral-900">Edit Product</h2>
      <div className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          name="name"
          className="border border-gray-300 w-full px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />
        <label className="block font-semibold text-neutral-700">Images</label>
        {form.images.map((img, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              className="border border-gray-300 flex-1 px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Image URL"
              value={img}
              onChange={e => handleImageChange(idx, e.target.value)}
            />
            <button type="button" onClick={() => removeImage(idx)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addImage} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">Add Image</button>

        <label className="block font-semibold mt-4 text-neutral-700">SKUs</label>
        {form.skus.map((sku, idx) => (
          <div key={idx} className="border border-gray-200 p-2 rounded-xl mb-2 bg-neutral-50">
            <input type="text" className="border border-gray-300 px-2 py-1 rounded mr-2 mb-1" placeholder="SKU Attr" value={sku.sku_attr} onChange={e => handleSkuChange(idx, 'sku_attr', e.target.value)} />
            <input type="text" className="border border-gray-300 px-2 py-1 rounded mr-2 mb-1" placeholder="Sale Price" value={sku.offer_sale_price} onChange={e => handleSkuChange(idx, 'offer_sale_price', e.target.value)} />
            <input type="text" className="border border-gray-300 px-2 py-1 rounded mr-2 mb-1" placeholder="SKU ID" value={sku.sku_id} onChange={e => handleSkuChange(idx, 'sku_id', e.target.value)} />
            <input type="text" className="border border-gray-300 px-2 py-1 rounded mr-2 mb-1" placeholder="Stock" value={sku.sku_available_stock} onChange={e => handleSkuChange(idx, 'sku_available_stock', e.target.value)} />
            <button type="button" onClick={() => removeSku(idx)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition">Remove SKU</button>
            <div className="ml-4 mt-2">
              <label className="block font-semibold text-neutral-700">SKU Properties</label>
              {sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((prop, pidx) => (
                <div key={pidx} className="flex gap-2 mb-1">
                  <input type="text" className="border border-gray-300 px-2 py-1 rounded" placeholder="Property Name" value={prop.sku_property_name} onChange={e => handleSkuPropChange(idx, pidx, 'sku_property_name', e.target.value)} />
                  <input type="text" className="border border-gray-300 px-2 py-1 rounded" placeholder="Value" value={prop.sku_property_value} onChange={e => handleSkuPropChange(idx, pidx, 'sku_property_value', e.target.value)} />
                  <input type="text" className="border border-gray-300 px-2 py-1 rounded" placeholder="Image URL" value={prop.sku_image} onChange={e => handleSkuPropChange(idx, pidx, 'sku_image', e.target.value)} />
                  <button type="button" onClick={() => removeSkuProp(idx, pidx)} className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded transition">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addSkuProp(idx)} className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded transition">Add SKU Property</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={addSku} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">Add SKU</button>

        <label className="block font-semibold mt-4 text-neutral-700">Properties</label>
        {form.property.map((prop, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="text" className="border border-gray-300 px-2 py-1 rounded" placeholder="Name" value={prop.attr_name} onChange={e => handlePropertyChange(idx, 'attr_name', e.target.value)} />
            <input type="text" className="border border-gray-300 px-2 py-1 rounded" placeholder="Value" value={prop.attr_value} onChange={e => handlePropertyChange(idx, 'attr_value', e.target.value)} />
            <button type="button" onClick={() => removeProperty(idx)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addProperty} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">Add Property</button>

        <label className="block font-semibold mt-4 text-neutral-700">Description</label>
        <textarea
          name="description"
          className="border border-gray-300 w-full px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default ProductForm;
