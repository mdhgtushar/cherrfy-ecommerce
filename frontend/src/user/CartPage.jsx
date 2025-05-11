import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

 

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  // const [cart, setCart] = useState(data);
 
  

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">${Number(item.price).toFixed(2)} x {item.quantity}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(updateQuantity({id:item.id, quantity: item.quantity - 1}))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >-
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({id:item.id, quantity: item.quantity + 1}))}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >+
                </button>
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

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to={"/order"} className="mt-4 w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 w-full block text-center font-semibold transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
