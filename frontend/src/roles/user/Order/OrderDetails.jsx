import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import API from "../../../util/API";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await API.get(`/order/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
        setError("Order not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading order...</div>;
  }

  if (error || !order) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  const {
    _id,
    shippingAddress,
    items,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    createdAt,
  } = order;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Summary</h2>
          <p className="text-gray-600 text-sm">Order ID: <span className="font-medium">{_id}</span></p>
          <p className="text-gray-500 text-sm">Placed on: {format(new Date(createdAt), "PPpp")}</p>
        </div>

        {/* Shipping Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Information</h3>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-1 text-gray-700">
              <p><strong>Address:</strong> {shippingAddress.address}</p>
              <p><strong>City:</strong> {shippingAddress.city}</p>
              <p><strong>Postal Code:</strong> {shippingAddress.postalCode}</p>
              <p><strong>Country:</strong> {shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Status & Payment</h3>
            <div className="bg-gray-50 p-4 rounded text-sm space-y-1 text-gray-700">
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <span className={isPaid ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {isPaid ? "Paid" : "Not Paid"}
                </span>
              </p>
              <p>
                <strong>Delivery Status:</strong>{" "}
                <span className={isDelivered ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                  {isDelivered ? "Delivered" : "Not Delivered"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ordered Items</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Unit Price: ${item.price}</p>
                </div>
                <div className="text-right text-sm font-semibold text-gray-800">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Items Price</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Price</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-2">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
