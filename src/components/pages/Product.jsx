import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Product = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate SHA-256 signature
  const generateSignature = (params, appSecret) => {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}${params[key]}`)
      .join('');
    const stringToSign = `${appSecret}${sortedParams}${appSecret}`;
    return CryptoJS.HmacSHA256(stringToSign, appSecret).toString(CryptoJS.enc.Hex).toUpperCase();
  };

  const fetchProductDetails = async () => {
    const apiUrl = 'https://api-sg.aliexpress.com/sync'; // Replace with the correct API endpoint
    const appKey = '510834';
    const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
    const accessToken = 'YOUR_ACCESS_TOKEN';

    setLoading(true);
    setError(null);

    const timestamp = Date.now();
    const params = {
      method: 'aliexpress.ds.product.get',
      app_key: appKey,
      access_token: accessToken,
      product_id: productId,
      target_currency: 'USD',
      target_language: 'en',
      timestamp: timestamp,
      sign_method: 'sha256', // Set the sign_method to sha256
    };

    const signature = generateSignature(params, appSecret);

    try {
      const response = await axios.post(
        apiUrl,
        {
          ...params,
          sign: signature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setProductData(response.data);
    } catch (err) {
      setError('Failed to fetch product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      fetchProductDetails();
    } else {
      setError('Please enter a product ID.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Fetch AliExpress Product Details</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
          style={{
            padding: '10px',
            marginRight: '10px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fetch Product
        </button>
      </form>

      {loading && <p>Loading product data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {productData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Product Details:</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
            {JSON.stringify(productData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Product;
