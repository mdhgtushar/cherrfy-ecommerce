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
    payment_channel: "",
  });

  useEffect(() => {
    axios
      .get("https://api.cherrfy.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/order", {
        items: [
          {
            product: "664eaeafc123456789abcd01",
            name: "Sample Product",
            quantity: 2,
            price: 100,
            image: "/images/sample.jpg",
          },
        ],
        shippingAddress: {
          address: "123 Main Street",
          city: "Dhaka",
          postalCode: "1205",
          country: "Bangladesh",
        },
        paymentMethod: "Credit Card",
        itemsPrice: 200,
        shippingPrice: 20,
        taxPrice: 10,
        totalPrice: 230,
      });

      toast.success("Order placed successfully");
      setTimeout(() => {
        navigate(USER_PATHS.ORDERS);
      }, 300);
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🛒 Place Your Order
      </h2>

      <div className="flex flex-row justify-between">
        {/* Order Summary */}
        <div className="w-1/3 bg-white rounded-lg p-4 border mr-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Your Items
          </h3>
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
        <div className="w-2/3 bg-white rounded-lg p-6 border">
          <form onSubmit={submitOrder} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Billing Address
            </h3>

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
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Details
              </h3>
              <label className="block mb-1 text-gray-600">
                Payment Channel
              </label>
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

