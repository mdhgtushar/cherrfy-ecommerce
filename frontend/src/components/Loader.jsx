import React from "react";

const Loader = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-blue-500 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                    ></path>
                </svg>
            </div>
        </div>
        <span className="ml-4 text-blue-600 font-semibold text-lg animate-pulse">
            Loading...
        </span>
    </div>
);

export default Loader;