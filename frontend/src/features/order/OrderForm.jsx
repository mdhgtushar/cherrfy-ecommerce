// OrderForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [products, setProducts] = useState({});
  const [formData, setFormData] = useState({
    product_id: '',
    sku_id: '',
    address: '',
    city: '',
    province: '',
    country: '',
    zip: '',
    full_name: '',
    mobile_no: '',
    phone_country: '',
    logistics_service_name: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/order', formData);
      alert('Order Response: ' + JSON.stringify(res.data));
    } catch (error) {
      alert('Error placing order');
    }
  };

  return (
    <form onSubmit={submitOrder} className='mt-20'>
      <select name="product_id" onChange={handleChange} required>
        <option value="">Select Product</option>
        {Object.entries(products).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <input name="sku_id" placeholder="SKU ID" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="province" placeholder="Province" onChange={handleChange} required />
      <input name="country" placeholder="Country" onChange={handleChange} required />
      <input name="zip" placeholder="ZIP" onChange={handleChange} required />
      <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
      <input name="mobile_no" placeholder="Mobile No" onChange={handleChange} required />
      <input name="phone_country" placeholder="Phone Country Code" onChange={handleChange} required />
      <input name="logistics_service_name" placeholder="Logistics Service" onChange={handleChange} required />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
