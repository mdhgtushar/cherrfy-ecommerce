import React from "react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const orders = [
    {
      id: "ORD123456",
      date: "2025-05-15",
      status: "Delivered",
      total: 120.49,
      items: [
        {
          id: 1,
          name: "Men's Leather Watch",
          image: "https://via.placeholder.com/80",
          price: 49.99,
          quantity: 1,
        },
        {
          id: 2,
          name: "Smartphone Case",
          image: "https://via.placeholder.com/80",
          price: 14.99,
          quantity: 2,
        },
      ],
    },
    {
      id: "ORD123457",
      date: "2025-04-28",
      status: "Shipped",
      total: 78.00,
      items: [
        {
          id: 3,
          name: "Wireless Earbuds",
          image: "https://via.placeholder.com/80",
          price: 78.0,
          quantity: 1,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border rounded-lg shadow-sm p-4 mb-5"
        >
          {/* Order Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p
                className={`text-sm font-medium ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                Status: {order.status}
              </p>
              <p className="text-lg font-semibold text-red-600">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button (optional) */}
          <div className="mt-4 text-right">
            <Link to={`/order/${order.id}`} className="text-sm text-blue-600 hover:underline">
              View Details
            </Link>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <p className="text-gray-600 text-center mt-8">You have no orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
