import React from "react";

const order = {
    id: "ORD-123456",
    date: "2024-06-15",
    status: "Shipped",
    total: "$129.99",
    shipping: {
        name: "Jane Doe",
        address: "123 Main St, Springfield, USA",
        method: "Standard Shipping",
    },
    items: [
        {
            id: 1,
            name: "Wireless Headphones",
            qty: 1,
            price: "$99.99",
            image: "https://via.placeholder.com/64",
        },
        {
            id: 2,
            name: "USB-C Cable",
            qty: 2,
            price: "$15.00",
            image: "https://via.placeholder.com/64",
        },
    ],
};

export default function OrderDetails() {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <div className="mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span>{order.date}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-green-600">{order.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">{order.total}</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
                <div>
                    <div>{order.shipping.name}</div>
                    <div>{order.shipping.address}</div>
                    <div className="text-gray-600">{order.shipping.method}</div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Items</h2>
                <ul>
                    {order.items.map((item) => (
                        <li key={item.id} className="flex items-center py-3 border-b last:border-b-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
                            <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-gray-500">Qty: {item.qty}</div>
                            </div>
                            <div className="font-semibold">{item.price}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}