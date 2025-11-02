import React from 'react';
import { Star, TrendingUp, Users, ThumbsUp, Image as ImageIcon } from 'lucide-react';

const ReviewStatistics = ({ reviews = [], productName = '' }) => {
  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === rating).length / totalReviews) * 100 : 0
  }));

  const verifiedReviews = reviews.filter(r => r.verified).length;
  const reviewsWithImages = reviews.filter(r => r.images && r.images.length > 0).length;
  const totalHelpful = reviews.reduce((sum, r) => sum + (r.helpful || 0), 0);
  const totalUnhelpful = reviews.reduce((sum, r) => sum + (r.unhelpful || 0), 0);

  const recentReviews = reviews.filter(r => {
    const reviewDate = new Date(r.createdAt || r.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return reviewDate > weekAgo;
  }).length;

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5: return 'Excellent';
      case 4: return 'Good';
      case 3: return 'Average';
      case 2: return 'Poor';
      case 1: return 'Very Poor';
      default: return '';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 5: return 'text-green-600 bg-green-100';
      case 4: return 'text-blue-600 bg-blue-100';
      case 3: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-orange-600 bg-orange-100';
      case 1: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (totalReviews === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
        <p className="text-gray-600">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Review Statistics for {productName}
      </h3>

      {/* Overall Rating */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-900">
              {getRatingLabel(Math.round(averageRating))}
            </div>
            <div className="text-sm text-gray-600">
              Overall Rating
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Rating Distribution</h4>
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm font-medium text-gray-700">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex items-center space-x-2 w-20">
                <span className="text-sm text-gray-600">{count}</span>
                <span className="text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-blue-900">{totalReviews}</div>
          <div className="text-sm text-blue-700">Total Reviews</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Star className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-green-900">{verifiedReviews}</div>
          <div className="text-sm text-green-700">Verified</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <ImageIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-purple-900">{reviewsWithImages}</div>
          <div className="text-sm text-purple-700">With Photos</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-orange-900">{recentReviews}</div>
          <div className="text-sm text-orange-700">This Week</div>
        </div>
      </div>

      {/* Helpfulness Stats */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Review Helpfulness</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Helpful Votes</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{totalHelpful}</div>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-red-600 rotate-180" />
              <span className="font-semibold text-red-900">Unhelpful Votes</span>
            </div>
            <div className="text-2xl font-bold text-red-900">{totalUnhelpful}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• {recentReviews} new review{recentReviews !== 1 ? 's' : ''} this week</p>
          <p>• {verifiedReviews} verified purchase{verifiedReviews !== 1 ? 's' : ''}</p>
          <p>• {reviewsWithImages} review{reviewsWithImages !== 1 ? 's' : ''} with photos</p>
          <p>• Average rating: {averageRating.toFixed(1)} out of 5 stars</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStatistics;
