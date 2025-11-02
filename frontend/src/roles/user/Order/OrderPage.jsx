import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../features/orderSlice";
import { Link } from "react-router-dom";

export default function Orders() {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.status === "loading");
  const dispatch = useDispatch();

  // ✅ Fetch orders from API
  useEffect(() => {
    // Dispatch action to fetch orders if not already loaded
    dispatch(fetchOrders());
  }, []);

  // ✅ Summary calculations
  const totalSpent = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const delivered = orders.filter((o) => o.isDelivered).length;
  const inTransit = orders.filter((o) => !o.isDelivered).length;

  const badge = (isDelivered) => {
    return isDelivered
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Orders in transit</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">{inTransit}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Delivered</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">{delivered}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl mt-6 shadow-sm">
        <div className="border-b border-gray-200 p-4 font-semibold text-gray-800">
          Your Orders
        </div>

        {orders.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            You have no orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Payment</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const firstItem = order.items[0];
                  const date = new Date(order.createdAt).toLocaleDateString();

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      {/* ✅ Image */}
                      <td className="py-3 px-4">
                        <img
                          src={firstItem?.image}
                          alt={firstItem?.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      </td>

                      {/* ✅ Order ID */}
                      <td className="py-3 px-4 font-medium text-gray-800">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      {/* ✅ Items */}
                      <td className="py-3 px-4 text-gray-700">
                        {order.items.length} item(s)
                      </td>

                      {/* ✅ Total */}
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        ${order.totalPrice.toFixed(2)}
                      </td>

                      {/* ✅ Payment Method */}
                      <td className="py-3 px-4 text-gray-700">
                        {order.paymentMethod}
                      </td>

                      {/* ✅ Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${badge(
                            order.isDelivered
                          )}`}
                        >
                          {order.isDelivered ? "Delivered" : "In Transit"}
                        </span>
                      </td>

                      {/* ✅ Date */}
                      <td className="py-3 px-4 text-gray-600">{date}</td>
                      <td>
                        <Link to={`/order/${order._id}`} className="bg-primary hover:bg-secondery text-white px-3 py-1 rounded-md text-sm">
                          order view
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
