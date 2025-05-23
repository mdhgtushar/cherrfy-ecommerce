import React, { useState } from 'react';

const AddSKU = ({skuList = []}) => {
  const [skus, setSkus] = useState(skuList);

  const handleAddSku = () => {
    setSkus([...skus, {
      sku_attr: "",
      offer_sale_price: "",
      sku_id: "",
      limit_strategy: "create_order_fail",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "",
      buy_amount_limit_set_by_promotion: "",
      offer_bulk_sale_price: "",
      sku_available_stock: 0,
      id: "",
      sku_bulk_order: 0,
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "",
            sku_image: "",
            sku_property_name: "Color",
            property_value_definition_name: "",
            property_value_id: 0,
            sku_property_id: 14
          },
          {
            sku_property_value: "",
            sku_property_name: "Is Customized",
            property_value_id: 0,
            sku_property_id: 200007009
          },
          {
            sku_property_value: "",
            sku_property_name: "Ships From",
            property_value_id: 0,
            sku_property_id: 200007763
          }
        ]
      }
    }]);
  };

  const handleRemoveSku = (index) => {
    const newSkus = [...skus];
    newSkus.splice(index, 1);
    setSkus(newSkus);
  };

  const handleInputChange = (index, field, value, nestedPath = null) => {
    const newSkus = [...skus];
    
    if (nestedPath) {
      // Handle nested object changes
      const path = nestedPath.split('.');
      let current = newSkus[index];
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
    } else {
      // Handle top-level changes
      newSkus[index][field] = value;
    }
    
    setSkus(newSkus);
  };

  const handlePropertyChange = (skuIndex, propertyIndex, field, value) => {
    const newSkus = [...skus];
    newSkus[skuIndex].ae_sku_property_dtos.ae_sku_property_d_t_o[propertyIndex][field] = value;
    setSkus(newSkus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted SKUs:", skus);
    // Here you would typically send the data to an API
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold pb-6 mb-6 border-b">SKU Management</h1>
      
      <form onSubmit={handleSubmit}>
        {skus.map((sku, skuIndex) => (
          <div key={skuIndex} className="mb-8 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">SKU #{skuIndex + 1}</h2>
              {skus.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSku(skuIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU ID</label>
                <input
                  type="text"
                  value={sku.sku_id}
                  onChange={(e) => handleInputChange(skuIndex, 'sku_id', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU Attributes</label>
                <input
                  type="text"
                  value={sku.sku_attr}
                  onChange={(e) => handleInputChange(skuIndex, 'sku_attr', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Sale Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={sku.offer_sale_price}
                  onChange={(e) => handleInputChange(skuIndex, 'offer_sale_price', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={sku.sku_price}
                  onChange={(e) => handleInputChange(skuIndex, 'sku_price', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Stock</label>
                <input
                  type="number"
                  value={sku.sku_available_stock}
                  onChange={(e) => handleInputChange(skuIndex, 'sku_available_stock', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bulk Order Quantity</label>
                <input
                  type="number"
                  value={sku.sku_bulk_order}
                  onChange={(e) => handleInputChange(skuIndex, 'sku_bulk_order', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={sku.price_include_tax}
                  onChange={(e) => handleInputChange(skuIndex, 'price_include_tax', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Price Includes Tax</label>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3">SKU Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {sku.ae_sku_property_dtos.ae_sku_property_d_t_o.map((property, propertyIndex) => (
                <div key={propertyIndex} className="border p-3 rounded">
                  <h4 className="font-medium mb-2">{property.sku_property_name}</h4>
                  
                  <div className="mb-2">
                    <label className="block text-sm text-gray-600 mb-1">Value</label>
                    <input
                      type="text"
                      value={property.sku_property_value}
                      onChange={(e) => handlePropertyChange(skuIndex, propertyIndex, 'sku_property_value', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  {property.sku_property_id === 14 && (
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={property.sku_image}
                        onChange={(e) => handlePropertyChange(skuIndex, propertyIndex, 'sku_image', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}
                  
                  <div className="mb-2">
                    <label className="block text-sm text-gray-600 mb-1">Property Value ID</label>
                    <input
                      type="number"
                      value={property.property_value_id}
                      onChange={(e) => handlePropertyChange(skuIndex, propertyIndex, 'property_value_id', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  
                  {property.sku_property_id === 14 && (
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600 mb-1">Value Definition Name</label>
                      <input
                        type="text"
                        value={property.property_value_definition_name}
                        onChange={(e) => handlePropertyChange(skuIndex, propertyIndex, 'property_value_definition_name', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleAddSku}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add SKU
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit All SKUs
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSKU;