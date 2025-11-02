import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  MoreVertical, 
  Calendar,
  User,
  Image as ImageIcon,
  Reply
} from 'lucide-react';
import StarRating from './StarRating';
import ReviewImageGallery from './ReviewImageGallery';

const ReviewCard = ({ 
  review, 
  onVote, 
  onReport, 
  onReply,
  showActions = true,
  compact = false 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleVote = (type) => {
    if (onVote) {
      onVote(review.id, type);
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport(review.id);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    
    setIsSubmittingReply(true);
    try {
      if (onReply) {
        await onReply(review.id, replyText);
        setReplyText('');
        setShowReplyForm(false);
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 ${
      compact ? 'p-3' : 'p-6'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {review.user?.name?.charAt(0) || review.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {review.user?.name || review.name || 'Anonymous User'}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(review.createdAt || review.date)}
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Reply"
            >
              <Reply className="w-4 h-4" />
            </button>
            <button
              onClick={handleReport}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Report"
            >
              <Flag className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating 
          rating={review.rating} 
          size="sm" 
          showLabel={true}
        />
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {review.comment || review.content}
        </p>
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <ReviewImageGallery images={review.images} />
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleVote('helpful')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                review.userVoted === 'helpful'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful || 0}</span>
            </button>
            
            <button
              onClick={() => handleVote('unhelpful')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                review.userVoted === 'unhelpful'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{review.unhelpful || 0}</span>
            </button>
          </div>

          <div className="text-sm text-gray-500">
            {review.verified && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                ✓ Verified Purchase
              </span>
            )}
          </div>
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              disabled={!replyText.trim() || isSubmittingReply}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingReply ? 'Sending...' : 'Reply'}
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {review.replies.map((reply, index) => (
            <div key={index} className="ml-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {reply.user?.name?.charAt(0) || 'A'}
                </div>
                <span className="font-medium text-sm text-gray-900">
                  {reply.user?.name || 'Admin'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(reply.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
