import React, { useState } from 'react';
import { Search, Camera } from 'lucide-react';

const SearchBar = () => {
  // State to hold the search term from the input field
  const [searchTerm, setSearchTerm] = useState('');

  // Mock handler for text-based search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // In a real app, you would navigate to a search results page
    // or call an API here.
    alert(`Searching for: ${searchTerm}`);
    console.log('Searching for:', searchTerm);
  };

  // Mock handler for image-based search
  const handleImageSearch = () => {
    // This would typically open a file picker or a camera interface.
    alert('Image search functionality is not implemented yet.');
    console.log('Initiating image search...');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex-1 mx-4 hidden md:flex items-center"
    >
      <div className="relative w-full">
        {/* Search Icon on the left */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        {/* The search input field with increased padding on the right to make space for buttons */}
        <input
          type="text"
          placeholder="Search for products, brands, and more"
          className="w-full pl-12 pr-24 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Container for the action buttons, now positioned inside the input field on the right */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
          {/* Image Search Button */}
          <button
            type="button"
            onClick={handleImageSearch}
            className="p-2 text-gray-500 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Search by image"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Vertical Divider */}
          <div className="h-5 border-l border-gray-300 mx-2"></div>

          {/* Main Search Submit Button - Now just an icon for a cleaner look */}
          <button
            type="submit"
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
            aria-label="Perform search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
