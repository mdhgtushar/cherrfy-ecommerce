import React, { useState } from "react";

const categories = ["Men", "Women", "Electronics", "Home", "Beauty"];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];
const ratings = [5, 4, 3, 2, 1];

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange({ categories: updated, brands: selectedBrands, minPrice, maxPrice, rating: selectedRating });
  };

  const handleBrandChange = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    onFilterChange({ categories: selectedCategories, brands: updated, minPrice, maxPrice, rating: selectedRating });
  };

  const handlePriceChange = () => {
    onFilterChange({ categories: selectedCategories, brands: selectedBrands, minPrice, maxPrice, rating: selectedRating });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilterChange({ categories: selectedCategories, brands: selectedBrands, minPrice, maxPrice, rating });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(null);
    onFilterChange({ categories: [], brands: [], minPrice: "", maxPrice: "", rating: null });
  };

  return (
    <div className="w-full md:w-64 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button onClick={clearFilters} className="text-sm text-red-600 hover:underline">Clear All</button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
            placeholder="Min"
            className="w-full border px-2 py-1 rounded text-sm"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
            placeholder="Max"
            className="w-full border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-medium mb-2">Rating</h3>
        {ratings.map((rate) => (
          <label key={rate} className="flex items-center text-sm mb-1 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rate}
              checked={selectedRating === rate}
              onChange={() => handleRatingChange(rate)}
              className="mr-2"
            />
            {"★".repeat(rate)}{" "}
            <span className="ml-1 text-gray-500"> & up</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
