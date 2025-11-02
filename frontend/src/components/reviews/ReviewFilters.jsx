import React from 'react';
import { Filter, SortAsc, SortDesc, Star, Calendar, ThumbsUp } from 'lucide-react';

const ReviewFilters = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  totalReviews = 0,
  averageRating = 0 
}) => {
  const ratingOptions = [
    { value: 'all', label: 'All Ratings', icon: Star },
    { value: 5, label: '5 Stars', icon: Star },
    { value: 4, label: '4 Stars', icon: Star },
    { value: 3, label: '3 Stars', icon: Star },
    { value: 2, label: '2 Stars', icon: Star },
    { value: 1, label: '1 Star', icon: Star },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: Calendar },
    { value: 'oldest', label: 'Oldest First', icon: Calendar },
    { value: 'highest', label: 'Highest Rating', icon: Star },
    { value: 'lowest', label: 'Lowest Rating', icon: Star },
    { value: 'helpful', label: 'Most Helpful', icon: ThumbsUp },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter & Sort Reviews</h3>
        </div>
        <div className="text-sm text-gray-600">
          {totalReviews} reviews • {averageRating.toFixed(1)} avg rating
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Rating
          </label>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => onFilterChange('rating', option.value)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    filters.rating === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Verified Purchase Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => onFilterChange('verifiedOnly', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Verified Purchase Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.withImages}
                  onChange={(e) => onFilterChange('withImages', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">With Images Only</span>
              </label>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="quarter">Past 3 Months</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                onFilterChange('rating', 'all');
                onFilterChange('verifiedOnly', false);
                onFilterChange('withImages', false);
                onFilterChange('dateRange', 'all');
                onSortChange('newest');
              }}
              className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;
