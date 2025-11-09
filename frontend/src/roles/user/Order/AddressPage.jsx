import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import USER_PATHS from "../USER_PATHS";

export default function AddressPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  const cart = [
    { name: "Hiphop Cross Necklace", qty: 1, price: 15.99 },
    { name: "Designer Sunglasses", qty: 1, price: 29.99 },
  ];

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.qty * it.price, 0),
    [cart]
  );

  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = +(subtotal + shipping).toFixed(2);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function saveAddress() {
    navigate(USER_PATHS.CHECKOUT);
  }

  return (
    <div className="min-h-screen  text-gray-800 px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333333]">Address</h1>
        <p className="text-sm text-gray-500">Enter your shipping information.</p>
      </div>

      {/* Steps */}
      <div className="bg-white border border-[#E0E0E0] rounded-md p-4 mb-6">
        <ol className="flex items-center text-xs text-gray-500 gap-2">
          <li className="flex items-center gap-2">
            <Link to="/cart" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">
                1
              </span>
              Cart
            </Link>
          </li>
          <span className="text-gray-300">—</span>
          <li className="flex items-center gap-2 font-semibold text-[#D2042D]">
            <span className="w-6 h-6 rounded-full border border-[#D2042D] text-[#D2042D] flex items-center justify-center">
              2
            </span>
            Address
          </li>
          <span className="text-gray-300">—</span>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
              3
            </span>
            Payment
          </li>
          <span className="text-gray-300">—</span>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center">
              4
            </span>
            Review
          </li>
        </ol>
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Address Form */}
        <div className="lg:col-span-2 bg-white border border-[#E0E0E0] rounded p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#333333] mb-4">
            Shipping Address
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                placeholder="+8801XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
              placeholder="House, Road"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Postal Code
              </label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                placeholder="Postal"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Country
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
              >
                <option value="Bangladesh">Bangladesh</option>
                <option value="United States">United States</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button
              onClick={saveAddress}
              className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2.5 px-6 rounded text-sm"
            >
              Continue to Payment
            </button>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white border border-[#E0E0E0] rounded p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold text-[#333333]">Order Summary</h2>

          {/* Items */}
          <div className="space-y-3 text-sm">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-2 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
