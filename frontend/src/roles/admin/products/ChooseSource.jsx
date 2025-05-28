import React from "react";
import { useNavigate } from "react-router-dom";
import ADMIN_PATHS from "../ADMIN_PATHS";

const sources = [
    { name: "Manual", route: ADMIN_PATHS.PRODUCTS.ADD, color: "bg-blue-500" },
    { name: "AliExpress", route: ADMIN_PATHS.PRODUCTS.ALIEXPRESS, color: "bg-red-500" },
    { name: "Factory", route: ADMIN_PATHS.PRODUCTS.ADD, color: "bg-green-500" },
    { name: "Vendor", route: ADMIN_PATHS.PRODUCTS.ADD, color: "bg-yellow-500" },
];

const ChooseSource = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Choose Product Source</h1>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full">
                {sources.map((source) => (
                    <div
                        key={source.name}
                        onClick={() => navigate(source.route)}
                        className={`cursor-pointer ${source.color} text-white py-10 rounded-xl shadow-lg text-center text-xl font-semibold transition-transform hover:scale-105`}
                    >
                        {source.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseSource;
