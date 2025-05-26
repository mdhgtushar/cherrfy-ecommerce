import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const VandorLayout = ({ children }) => {
    return (
        <div className="min-h-screen grid grid-rows-[60px_1fr_40px] grid-cols-[280px_1fr] grid-areas-vandor-layout">
            <header className="flex justify-between grid-in-header bg-gray-900 text-white flex items-center px-1">
                <Link to={"/manage-vandor/dashboard"} className="text-xl font-bold border p-2 rounded border-gray-600 text-gray-500">Cherrfy Vandor Dashboard</Link>
                {/* Add navigation or user info here */}
                <div>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
                </div>
            </header>
            <aside className="grid-in-sidebar bg-gray-100 py-6 px-2">
                <nav>
                    <ul className="list-none p-0">
                        <SideButton to="/manage-vandor/dashboard" label="Dashboard" />
                        <SideButton to="/manage-vandor/message-center" label="Message Center" />
                        <SideButton to="/manage-vandor/products" label="Products" />
                        <SideButton to="/manage-vandor/orders" label="Orders" />
                        <SideButton to="/manage-vandor/promotion" label="Promotion & Coupons" />
                        <SideButton to="/manage-vandor/settings" label="Settings" /> 
                    </ul>
                </nav>
            </aside>
            <main className="grid-in-content p-8 bg-white">
                <Outlet />
            </main>
            <footer className="grid-in-footer bg-gray-900 text-white text-center leading-[40px]">
                &copy; {new Date().getFullYear()} Cherrfy Vandor Panel
            </footer>
            <style>
                {`
                .grid-areas-vandor-layout {
                    display: grid;
                    grid-template-areas:
                        "header header"
                        "sidebar content"
                        "footer footer";
                }
                .grid-in-header { grid-area: header; }
                .grid-in-sidebar { grid-area: sidebar; }
                .grid-in-content { grid-area: content; }
                .grid-in-footer { grid-area: footer; }
                `}
            </style>
        </div>
    );
};

const SideButton = ({ to, label }) => {
    return (
        <li>
            <Link to={to} className="block my-4 p-2 bg-gray-200 border border-gray-300 px-4 text-gray-900 font-medium hover:text-blue-600 transition">{label}</Link>
        </li>
    );
};



export default VandorLayout;
