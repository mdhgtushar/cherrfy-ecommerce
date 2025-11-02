import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const B2CTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const testRoutes = [
    "/manage-admin/b2c",
    "/manage-admin/b2c/customers",
    "/manage-admin/b2c/orders",
    "/manage-admin/b2c/wishlist",
    "/manage-admin/b2c/reviews",
    "/manage-admin/b2c/pricing",
    "/manage-admin/b2c/coupons",
    "/manage-admin/b2c/loyalty"
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">B2C Route Test</h1>
      
      <div className="mb-4">
        <p><strong>Current Location:</strong> {location.pathname}</p>
        <p><strong>Current Search:</strong> {location.search}</p>
        <p><strong>Current Hash:</strong> {location.hash}</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Test Routes:</h2>
        {testRoutes.map((route) => (
          <button
            key={route}
            onClick={() => navigate(route)}
            className="block w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded"
          >
            Navigate to: {route}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default B2CTest;
