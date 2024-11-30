import React, { useState, useEffect } from 'react';

// Replace these with your actual values
const appKey = '510834';
const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
const productId = '1005007369344549';  // Replace with actual product ID

const AliExpressProductInfo = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch product info
    const fetchProductData = async () => {
      try {
        const timestamp = new Date().toISOString();
        const sign = generateSignature({ appKey, productId, timestamp, appSecret });
        
        const response = await fetch(`https://api.aliexpress.com/api?method=aliexpress.affiliate.product.get&app_key=${appKey}&timestamp=${timestamp}&product_id=${productId}&sign=${sign}&format=json`);
        
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('Failed to fetch product data');
        }
      } catch (err) {
        setError('An error occurred while fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const generateSignature = (params) => {
    // A simple example, you'd need to implement this properly on the server-side for security
    const { appKey, productId, timestamp, appSecret } = params;
    const queryString = `app_key=${appKey}&timestamp=${timestamp}&product_id=${productId}`;
    const signature = btoa(queryString + appSecret);  // Not secure, use proper HMAC or MD5 in real application
    return signature;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <h3>{product.title}</h3>
        <p>Price: {product.price}</p>
        <img src={product.imageUrl} alt={product.title} />
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default AliExpressProductInfo;
