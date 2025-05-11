import { useState } from 'react';

const AliExpressProductForm = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProductInfo = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const appKey = '510834';
      const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
      const accessToken = '50000101140zfnZXzhWcnqCVodZgFv4Nw1FFFvgvGw1EG3FtRi8Q18207c5aQKm3OAov';
      const timestamp = Date.now();
      const method = 'aliexpress.ds.product.get';
      const apiUrl = 'https://api-sg.aliexpress.com/sync';

      const params = {
        method,
        app_key: appKey,
        access_token: accessToken,
        timestamp,
        product_id: productId,
        ship_to_country: 'bd',
        sign_method: 'sha256',
        aliexpress_category_id: '200135143',
      };

      const signString = Object.keys(params)
        .sort()
        .map((key) => key + params[key])
        .join('');

      const encoder = new TextEncoder();
      const keyData = encoder.encode(appSecret);
      const msgData = encoder.encode(signString);

      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
      const signHex = Array.from(new Uint8Array(signatureBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();

      params.sign = signHex;
      const query = new URLSearchParams(params).toString();

      const response = await fetch(`${apiUrl}?${query}`);
      const data = await response.json();

      const result = data?.aliexpress_ds_product_get_response?.result;
      const skuInfo = result?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o?.[0];

      if (result) {
        setProduct({
          title: result.subject || '',
          description: result.detail || '',
          price: skuInfo?.offer_sale_price || '',
          stock: skuInfo?.sku_available_stock || '',
          image: result.image_urls?.split(',')[0] || '',
        });
      } else {
        setMessage('Product not found.');
        setProduct({
          title: '',
          description: '',
          price: '',
          stock: '',
          image: '',
        });
      }

    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch product info.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveToDatabase = async () => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Product saved successfully!');
      } else {
        setMessage(data?.error || 'Failed to save product.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving to database.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-center mb-4">AliExpress Product Import</h2>

      <form onSubmit={fetchProductInfo} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 border rounded"
          placeholder="Enter AliExpress Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </form>

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded"
            rows="4"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label>
            <span className="text-gray-700">Price</span>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </label>
          <label>
            <span className="text-gray-700">Stock</span>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700">Image URL</span>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded"
          />
        </label>

        {product.image && (
          <img
            src={product.image}
            alt="Product"
            className="w-32 h-32 mt-2 object-cover border rounded"
          />
        )}

        <button
          onClick={saveToDatabase}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Product to Database
        </button>
      </div>

      {message && <p className="mt-4 text-center text-sm text-blue-600 font-medium">{message}</p>}
    </div>
  );
};

export default AliExpressProductForm;
