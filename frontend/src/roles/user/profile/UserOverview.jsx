import React, { useEffect } from "react";
import USER_PATHS from "../USER_PATHS";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../features/orderSlice";
import { fetchProducts, getAllProducts } from "../../../features/productSlice";

export default function Profile() {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.status === "loading");
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);
  const ordersInTransit = orders.filter((o) => !o.isDelivered).length;
  const availableVouchers = 3;
  const unreadNotifications = 5;
  const user = { name: userAuth.user.name, email: userAuth.user.email };
  const products = useSelector((state) => state.products.products);

  const recommendations = products;

  const badge = (isDelivered) => {
    return isDelivered
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";
  };

  // ✅ Fetch orders from API
  useEffect(() => {
    // Dispatch action to fetch orders if not already loaded
    dispatch(fetchOrders());
  }, []);

  useEffect(() => {
    // Fetch products for recommendations
    if (products.length === 0)
      dispatch(fetchProducts({ country: "US", currency: "USD", page: 2 }));
  }, [dispatch, products.length]);
  
  return (
    <div activeKey="dashboard" pageTitle="Account Overview">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#F8F8F8] p-4 border border-[#E0E0E0] rounded">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 flex-none flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold mr-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-[#333333]">
                {user.name}
              </p>
              <p className="text-sm text-gray-600">{user.email}</p>
              {/* <span className="px-2 py-0.5 mt-1 inline-block text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {user.tier}
                </span> */}
            </div>
          </div>
          <Link
            to={USER_PATHS.MANAGEPROFILE}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to={USER_PATHS.ORDER}
          className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition"
        >
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
            Orders In Transit
          </p>
          <p className="text-4xl font-bold text-[#333333] mt-2">
            {ordersInTransit}
          </p>
          <p className="text-sm text-blue-600 font-medium mt-3">
            Track Shipment →
          </p>
        </Link>
        <Link
          to={USER_PATHS.VAUCHERS}
          className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition"
        >
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
            Available Vouchers
          </p>
          <p className="text-4xl font-bold text-[#333333] mt-2">
            {availableVouchers}
          </p>
          <p className="text-sm text-green-600 font-medium mt-3">
            Redeem Now →
          </p>
        </Link>
        <Link
          to={USER_PATHS.NOTIFICATIONS}
          className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition"
        >
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
            Unread Notifications
          </p>
          <p className="text-4xl font-bold text-[#333333] mt-2">
            {unreadNotifications}
          </p>
          <p className="text-sm text-orange-600 font-medium mt-3">
            Go to Inbox →
          </p>
        </Link>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded mt-6 shadow-sm">
        <div className="border-b border-gray-200 p-4 font-semibold text-gray-800 flex items-center justify-between">
          <div>Your Orders</div>
          <div>
            <Link
              to={USER_PATHS.ORDER}
              className="text-sm text-primary font-medium mt-3"
            >
              View All Orders →
            </Link>
          </div>
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
                {orders.slice(0, 2).map((order) => {
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
                        <Link
                          to={`/order/${order._id}`}
                          className="bg-primary hover:bg-secondery text-white px-3 py-1 rounded-md text-sm"
                        >
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

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
          Recommended For You aa
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((p, idx) => (
              <a
                key={idx}
                href={p.link}
                className="group block bg-white border border-[#E0E0E0] rounded hover:shadow-md transition"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-[#333333] leading-snug group-hover:text-[#D2042D] transition-colors line-clamp-2">
                    {p.name}
                  </h4>
                  <p className="text-lg font-bold text-[#D2042D] mt-1">
                    {p.currency} {p.price}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="mr-1">★</span>
                    <span>{p.rateing}</span>
                    <span className="ml-auto text-gray-400">
                      {" "}
                      ({p.rate} reviews)
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
