import React, { useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import API from "../../../util/API";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/category/");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full mx-auto mt-10 bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          🗂️ Category Management
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={getCategories}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all">
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          Loading categories...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No categories found 😕
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all"
            >
              <h3 className="text-base font-medium text-gray-800 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.description || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
