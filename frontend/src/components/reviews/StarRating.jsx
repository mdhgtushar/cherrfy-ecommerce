import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  interactive = false, 
  size = 'md',
  showLabel = true,
  className = '' 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className="flex items-center"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} transition-all duration-200 ${
              interactive ? 'cursor-pointer hover:scale-110' : ''
            } ${
              star <= displayRating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
          />
        ))}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating} out of 5` : 'Not rated'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
