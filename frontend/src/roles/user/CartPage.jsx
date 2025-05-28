import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { checkout, checkoutOne, clearCart, removeFromCart, updateQuantity } from '../../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import USER_PATHS from './USER_PATHS';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.items);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectedProducts = cart.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const goOrder = () => {
    dispatch(
      checkout(selectedItems)
    );

    navigate(USER_PATHS.CHECKOUT);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <button
        onClick={() => dispatch(clearCart())}
        className="mb-4 text-red-600 hover:underline text-sm"
      >
        Clear Cart
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart List */}
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="form-checkbox w-5 h-5"
              />

              {/* Product Image */}
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  ${Number(item.price).toFixed(2)} x {item.quantity}
                </p>
              </div>

              {/* Quantity and Remove */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >-</button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >+</button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>

          {selectedItems.length > 0 ? (
            <>
              <div className="space-y-1 mb-4">
                {selectedProducts.map(item => (
                  <div key={item.id} className="text-sm text-gray-700 flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={goOrder} 
                className="mt-4 w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 block text-center font-semibold transition disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">Select products to checkout.</p>
          )}
        </div>
      </div>
    </div>
  );
}
