import { useState } from "react";
import { ChevronDown, Filter, Search } from "lucide-react";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

const CategoryHeader = ({ title = "✨ Top Picks For", onFilterToggle }) => {
  const [sort, setSort] = useState("popularity");

  return (
    <div className="bg-white px-4 md:px-8 py-6 shadow-sm border-b">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title & Breadcrumb */}
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            <span className="hover:underline cursor-pointer">Home</span> /{" "}
            <span className="text-gray-700 font-medium">{title}</span>
          </nav>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none border pl-4 pr-10 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          </div>

          {/* Filter Button */}
          <button
            onClick={onFilterToggle}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
