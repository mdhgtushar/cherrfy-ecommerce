import React, { useState, useEffect } from "react";
import B2CHeader from "./B2CHeader";

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  // Mock data - replace with actual API call
  const mockReviews = [
    {
      id: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      productName: "Wireless Bluetooth Headphones",
      productId: "PROD-001",
      rating: 5,
      title: "Excellent sound quality!",
      comment: "These headphones have amazing sound quality and the battery life is incredible. Highly recommend!",
      status: "approved",
      reviewDate: "2024-01-15",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      productName: "Smart Watch Series 5",
      productId: "PROD-002",
      rating: 4,
      title: "Good watch with minor issues",
      comment: "The watch is great overall, but the battery could last longer. The fitness tracking is accurate though.",
      status: "approved",
      reviewDate: "2024-01-14",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      productName: "Organic Coffee Beans",
      productId: "PROD-003",
      rating: 1,
      title: "Terrible quality",
      comment: "The coffee beans were stale and had no flavor. Very disappointed with this purchase.",
      status: "pending",
      reviewDate: "2024-01-13",
      helpful: 2,
      verified: false
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      productName: "Yoga Mat Premium",
      productId: "PROD-004",
      rating: 5,
      title: "Perfect for my yoga practice",
      comment: "This yoga mat is exactly what I needed. Great grip and comfortable thickness.",
      status: "approved",
      reviewDate: "2024-01-12",
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      customerName: "David Brown",
      customerEmail: "david@example.com",
      productName: "Laptop Stand Adjustable",
      productId: "PROD-005",
      rating: 3,
      title: "Average product",
      comment: "It works as expected but feels a bit flimsy. Could be more sturdy for the price.",
      status: "hidden",
      reviewDate: "2024-01-11",
      helpful: 5,
      verified: true
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = reviews;

    // Filter by search term
    if (searchFilter) {
      filtered = filtered.filter(review =>
        review.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        review.productName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        review.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Filter by rating
    if (ratingFilter !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(review => review.status === statusFilter);
    }

    setFilteredReviews(filtered);
  }, [reviews, searchFilter, ratingFilter, statusFilter]);

  const handleSelectReview = (reviewId) => {
    setSelectedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length && filteredReviews.length > 0) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map(review => review.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on reviews:`, selectedReviews);
    // Implement bulk actions
  };

  const handleReply = (reviewId) => {
    setReplyingTo(reviewId);
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      console.log(`Replying to review ${replyingTo}:`, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      hidden: "bg-red-100 text-red-800",
      flagged: "bg-orange-100 text-orange-800"
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <B2CHeader />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Feedback Management</h2>
            <p className="text-gray-600">Moderate customer reviews and manage feedback</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{getAverageRating()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.filter(r => r.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = getRatingDistribution()[rating];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-20">
                      <span className="text-sm text-gray-600">{rating}</span>
                      <span className="ml-1">⭐</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Reviews
                </label>
                <input
                  type="text"
                  placeholder="Search by customer, product, or review content"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Rating
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="hidden">Hidden</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Export Reviews
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedReviews.length > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">
                  {selectedReviews.length} review(s) selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('approve')}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleBulkAction('hide')}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Hide
                  </button>
                  <button
                    onClick={() => handleBulkAction('flag')}
                    className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    Flag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reviews ({filteredReviews.length})
                </h3>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Select All</span>
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading reviews...</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => handleSelectReview(review.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {review.customerName}
                            </h4>
                            {review.verified && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Verified Purchase
                              </span>
                            )}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(review.status)}`}>
                              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600">
                              {review.rating}/5
                            </span>
                          </div>
                          
                          <h5 className="text-sm font-semibold text-gray-900 mb-1">
                            {review.title}
                          </h5>
                          
                          <p className="text-sm text-gray-700 mb-3">
                            {review.comment}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Product: {review.productName}</span>
                            <span>•</span>
                            <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{review.helpful} helpful</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleReply(review.id)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          Reply
                        </button>
                        <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                          Approve
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                          Hide
                        </button>
                      </div>
                    </div>
                    
                    {/* Reply Section */}
                    {replyingTo === review.id && (
                      <div className="mt-4 ml-8 p-4 bg-gray-50 rounded-lg">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmitReply}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {filteredReviews.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No reviews found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsManagement;
