import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../util/API";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      console.log('Fetching orders...');
      const result = await API.get(`/order`);
      console.log('Orders API response:', result);
      
      // Handle the new response format with nested data
      const ordersData = result.data.data || result.data;
      console.log('Orders data:', ordersData);
      
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      console.error("Error response:", error.response);
      setOrders([]);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount, currency = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white shadow rounded-lg">
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
          <Link
            to="/"
            className="inline-block mt-4 text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl shadow-sm p-6 mb-6"
          >
            {/* Order Info */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Payment:</span>{" "}
                  {order.isPaid ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${
                    order.isDelivered ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </span>
                <p className="text-xl font-bold text-gray-800 mt-2">
                  {formatCurrency(order.totalPrice, order.items?.[0]?.currency || "USD")}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} | Price:{" "}
                      {formatCurrency(item.price, item.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment & Action */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-5 gap-3">
              <div className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-700">
                Payment Method: <strong>{order.paymentMethod}</strong>
              </div>

              <Link
                to={`/order/${order._id}`}
                className="inline-block text-sm text-blue-600 font-medium hover:underline"
              >
                View Order Details →
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
