import React from "react";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  // ✅ Dummy Data
  const user = {
    name: "Al Sadman Awal",
    phone: "+8801XXXXXXX",
    address: "123 Main St, Dhaka, Bangladesh",
  };

  const paymentMethod = "Google Pay"; // dummy
  const region = "BD";

  const cart = [
    { name: "Hiphop Cross Necklace", qty: 1, price: 15.99 },
    { name: "Designer Sunglasses", qty: 1, price: 29.99 },
  ];

  const subtotal = cart.reduce((s, it) => s + it.qty * it.price, 0);
  const discount = 5;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal - discount + tax).toFixed(2);

  return (
    <div className="min-h-screen text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ✅ Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#333333]">Review Your Order</h1>
          <p className="text-sm text-gray-500">Verify everything before placing your order.</p>
        </div>

        {/* ✅ Step Indicator */}
        <div className="bg-white border border-[#E0E0E0] rounded-md p-4 mb-6">
          <ol className="flex items-center text-xs text-gray-500 gap-2">
            <li className="flex items-center gap-2">
              <Link to="/cart" className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">1</span> Cart
              </Link>
            </li>
            <span className="text-gray-300">—</span>

            <li className="flex items-center gap-2">
              <Link to="/shipping-address" className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">2</span> Address
              </Link>
            </li>
            <span className="text-gray-300">—</span>

            <li className="flex items-center gap-2">
              <Link to="/checkout" className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D2042D] text-white flex items-center justify-center">3</span> Payment
              </Link>
            </li>
            <span className="text-gray-300">—</span>

            {/* ✅ Active Step */}
            <li className="flex items-center gap-2 font-semibold text-[#D2042D]">
              <span className="w-6 h-6 rounded-full border border-[#D2042D] text-[#D2042D] flex items-center justify-center">4</span> Review
            </li>
          </ol>
        </div>

        {/* ✅ Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* ✅ Shipping Info */}
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Delivery Information</div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="text-sm text-[#333333]">{user.name} · <span>{user.phone}</span></p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Shipping Address</p>
                  <p className="text-sm text-[#333333]">{user.address}</p>
                </div>
              </div>
            </div>

            {/* ✅ Payment Info */}
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Payment Method</div>
              <div className="p-6 text-sm">
                <p className="text-[#333333]">{paymentMethod}</p>
                <p className="text-xs text-gray-500">Region: {region}</p>
              </div>
            </div>

            {/* ✅ Items */}
            <div className="bg-white border border-[#E0E0E0] rounded">
              <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Items</div>
              <div className="p-6 space-y-4 text-sm">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between border-b border-[#F0F0F0] pb-3">
                    <div>
                      <p className="text-[#333333] font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-[#333333] font-semibold">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Order Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E0E0E0] rounded p-6 text-sm space-y-3">

              <h2 className="font-semibold text-[#333333] mb-2">Order Summary</h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">- ${discount}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax}</span>
              </div>

              <div className="border-t border-[#E0E0E0] pt-3 flex justify-between font-semibold text-[#333333]">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <Link to="/success-order" className="w-full block text-center bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-semibold py-2.5 rounded text-sm mt-3">
                Place Order
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
