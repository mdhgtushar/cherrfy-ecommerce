import React, { useState } from 'react';

const dummyDatabase = {
  '123': {
    title: 'Wireless Mouse',
    price: '15.99',
    image: 'https://example.com/mouse.jpg',
    url: 'https://aliexpress.com/item/123',
  },
  '456': {
    title: 'Bluetooth Speaker',
    price: '25.99',
    image: 'https://example.com/speaker.jpg',
    url: 'https://aliexpress.com/item/456',
  },
};

const ProductForm = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    image: '',
    url: '',
  });
  const [isFound, setIsFound] = useState(false);

  const handleSearch = () => {
    if (dummyDatabase[productId]) {
      setProductData(dummyDatabase[productId]);
      setIsFound(true);
    } else {
      setProductData({
        title: '',
        price: '',
        image: '',
        url: '',
      });
      setIsFound(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving Product:', { productId, ...productData });
    // send to backend or save in db here
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add / Update Product</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded-xl px-3 py-2 w-full"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          className="border w-full px-3 py-2 rounded-xl"
          placeholder="Product Title"
          value={productData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          className="border w-full px-3 py-2 rounded-xl"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          className="border w-full px-3 py-2 rounded-xl"
          placeholder="Image URL"
          value={productData.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          className="border w-full px-3 py-2 rounded-xl"
          placeholder="Product URL"
          value={productData.url}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-xl"
      >
        Save Product
      </button>

      {isFound && (
        <p className="text-green-500 mt-4">✔ Product data loaded successfully.</p>
      )}
    </div>
  );
};

export default ProductForm;
