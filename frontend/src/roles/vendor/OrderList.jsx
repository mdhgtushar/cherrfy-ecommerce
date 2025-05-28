import React, { useEffect, useState } from "react";

const mockOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        date: "2024-06-01",
        status: "Pending",
        total: 120.5,
        items: 3,
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2024-06-02",
        status: "Shipped",
        total: 89.99,
        items: 2,
    },
    {
        id: "ORD-003",
        customer: "Alice Johnson",
        date: "2024-06-03",
        status: "Delivered",
        total: 45.0,
        items: 1,
    },
];

const statusColors = {
    Pending: "#fbbf24",
    Shipped: "#3b82f6",
    Delivered: "#22c55e",
};

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Replace with API call in production
        setOrders(mockOrders);
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Vendor Orders</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f3f4f6" }}>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Order ID</th>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Customer</th>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Date</th>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Items</th>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Total ($)</th>
                        <th style={{ padding: "0.5rem", textAlign: "left" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                                No orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.5rem" }}>{order.id}</td>
                                <td style={{ padding: "0.5rem" }}>{order.customer}</td>
                                <td style={{ padding: "0.5rem" }}>{order.date}</td>
                                <td style={{ padding: "0.5rem" }}>{order.items}</td>
                                <td style={{ padding: "0.5rem" }}>{order.total.toFixed(2)}</td>
                                <td style={{ padding: "0.5rem" }}>
                                    <span
                                        style={{
                                            background: statusColors[order.status] || "#d1d5db",
                                            color: "#fff",
                                            padding: "0.25rem 0.75rem",
                                            borderRadius: "1rem",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;