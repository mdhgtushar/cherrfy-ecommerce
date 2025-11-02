import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import API from "../../../util/API";
import USER_PATHS from "../USER_PATHS";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const OrderForm = () => {
  const checkoutItems = useSelector((state) => state.cart.checkoutItems);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    province: "",
    country: "",
    zip: "",
    full_name: "",
    mobile_no: "",
    phone_country: "",
    logistics_service_name: "",
    payment_channel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const shippingAddress = {
      address: formData.address,
      city: formData.city,
      postalCode: formData.zip,
      country: formData.country,
    };

    const items = checkoutItems.map((item) => ({
      product: item.productId || item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      currency: item.currency || "USD",
    }));

    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // free shipping above $100
    const taxPrice = Number((0.1 * itemsPrice).toFixed(2)); // 10% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    try {
      await API.post("/order", {
        items,
        shippingAddress,
        paymentMethod: formData.payment_channel,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      toast.success("✅ Order placed successfully!");
      setTimeout(() => {
        navigate(USER_PATHS.ORDERS);
      }, 800);
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("❌ Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">🛒 Place Your Order</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white rounded-lg p-4 border">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Items</h3>
          {checkoutItems.map((item) => (
            <div key={item._id} className="flex items-center mb-4 border-b pb-2">
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
        <div className="lg:w-2/3 bg-white rounded-lg p-6 border">
          <form onSubmit={submitOrder} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "full_name" },
                { label: "Mobile Number", name: "mobile_no" },
                { label: "Phone Country Code", name: "phone_country" },
                { label: "Address", name: "address" },
                { label: "City", name: "city" },
                { label: "Province", name: "province" },
                { label: "Country", name: "country" },
                { label: "ZIP Code", name: "zip" },
                { label: "Logistics Service", name: "logistics_service_name" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block mb-1 text-gray-600">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded text-sm"
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
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
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
