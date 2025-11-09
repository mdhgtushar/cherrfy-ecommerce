import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkout,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import USER_PATHS from "../USER_PATHS";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items) || [];

  const [isOpen, setIsOpen] = useState(false);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      ),
    [items]
  );

  const toggleCart = () => setIsOpen(!isOpen);

  const goCheckout = () => {
    if (!items.length) return;
    const selectedItems = items.map((it) => ({
      id: it.id,
      name: it.name,
      price: Number(it.price),
      quantity: it.quantity,
      image: it.image,
      sku_id: it.sku_id,
    }));
    dispatch(checkout(selectedItems));
    navigate(USER_PATHS.CHECKOUT);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-4 rounded shadow-lg z-50 transition-transform transform hover:scale-110"
      >
        <ShoppingCart size={28} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-red-600">
            {items.length}
          </span>
        )}
      </button>

      {/* Sidebar Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={toggleCart}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b border-gray-100 pb-2"
              >
                {/* Product Image */}
                <img
                  src={item.image || "https://via.placeholder.com/60"}
                  alt={item.name}
                  className="w-14 h-14 rounded object-cover border flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-gray-800 truncate"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ${item.price} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                      className="w-6 h-6 border rounded text-gray-700 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="w-6 h-6 border rounded text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 ml-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={goCheckout}
            disabled={items.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded disabled:opacity-50"
          >
            Checkout
          </button>
          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
