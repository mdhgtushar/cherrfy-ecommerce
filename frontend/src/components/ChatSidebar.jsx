import React, { useState } from "react";
import { ShoppingCart, X , MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";

const CartChatSidebar = ({ chatMessages = [] }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items || []);

  return (
    <>
      {/* Buttons Container */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded shadow-lg transition-transform transform hover:scale-110 relative"
        >
          <ShoppingCart size={28} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-red-600">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded shadow-lg transition-transform transform hover:scale-110 relative"
        >
            <MessageCircle size={28} />
          {chatMessages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {chatMessages.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((it) => (
              <div key={it.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={it.image || "https://via.placeholder.com/40"} alt={it.name} className="w-12 h-12 rounded object-cover" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{it.name}</p>
                    <p className="text-xs text-gray-500">${it.price} × {it.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 flex flex-col ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat</h2>
          <button onClick={() => setIsChatOpen(false)} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-4">No messages yet.</p>
          ) : (
            chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 border-b border-gray-100 pb-2">
                <img src={msg.avatar || "https://via.placeholder.com/40"} alt={msg.sender} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{msg.sender}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{msg.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Open Full Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default CartChatSidebar;
