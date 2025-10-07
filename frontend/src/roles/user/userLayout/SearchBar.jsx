import React, { useState } from 'react';
import { Search, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  // State to hold the search term from the input field
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // Mock handler for text-based search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
   navigate(`/search/${searchTerm}`);
  };

  // Mock handler for image-based search
  const handleImageSearch = () => {
    // This would typically open a file picker or a camera interface.
    alert('Image search functionality is not implemented yet.');
    console.log('Initiating image search...');
  };

  return (

          <div className="flex-1 max-w-xl mx-4 hidden md:flex">
            <form className="relative w-full" onSubmit={handleSearch}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, and more"
                className="w-full pl-12 pr-28 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button
                  type="button"
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                  onClick={handleImageSearch}
                  disabled
                >
                  <Camera className="w-5 h-5" />
                </button>
                <div className="h-5 border-l border-gray-300 mx-2"></div>
                <button
                  type="submit"
                  className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
  );
};

export default SearchBar;
