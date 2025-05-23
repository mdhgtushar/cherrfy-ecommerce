import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const checkoutItems = useSelector((state) => state.cart.checkoutItems);

  const [products, setProducts] = useState({});
  const [formData, setFormData] = useState({
    product_id: "",
    sku_id: "",
    address: "",
    city: "",
    province: "",
    country: "",
    zip: "",
    full_name: "",
    mobile_no: "",
    phone_country: "",
    logistics_service_name: "",
    payment_channel: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/order", formData);
      alert("Order Response: " + JSON.stringify(res.data));
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛒 Place Your Order
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg p-4 border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Items</h3>
          {checkoutItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h4 className="text-gray-800 font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6 border">
          <form onSubmit={submitOrder} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Billing Address</h3>
 

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[ 
                { label: "Address", name: "address" },
                { label: "City", name: "city" },
                { label: "Province", name: "province" },
                { label: "Country", name: "country" },
                { label: "ZIP Code", name: "zip" },
                { label: "Full Name", name: "full_name" },
                { label: "Mobile Number", name: "mobile_no" },
                { label: "Phone Country Code", name: "phone_country" },
                { label: "Logistics Service", name: "logistics_service_name" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block mb-1 text-gray-600">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-sm "
                    required
                  />
                </div>
              ))}
            </div>

            {/* Payment Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment Details</h3>
              <label className="block mb-1 text-gray-600">Payment Channel</label>
              <select
                name="payment_channel"
                value={formData.payment_channel}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select Payment Channel</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
