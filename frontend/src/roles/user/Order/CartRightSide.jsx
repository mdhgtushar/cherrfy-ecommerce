import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const CartRightSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems = [] } = useSelector((state) => state.cart);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
  onClick={toggleCart}
  className="fixed right-4 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded shadow-lg z-50 transition-transform transform hover:scale-110"
>
<ShoppingCart size={28} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
</button>

      {/* Sliding Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Example Cart Item */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Product Name</h3>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <span className="font-semibold">$50</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Another Product</h3>
              <p className="text-sm text-gray-500">Qty: 2</p>
            </div>
            <span className="font-semibold">$100</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total:</span>
            <span>$150</span>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartRightSide;
