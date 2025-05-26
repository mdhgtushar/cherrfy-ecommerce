import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-4 text-gray-500 italic">No reviews yet.</div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>
      <p>{reviews.length} reviews</p>
      
      {reviews.map((review, index) => (
        <div
          key={index}
          className="rounded p-4 bg-white"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-800">{review.name}</h3>
            <span className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={i < review.rating ? 'currentColor' : 'none'}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {review.rating} out of 5
            </span>
          </div>

          <p className="text-gray-700">{review.comment}</p>

          <div className="mt-2">
            <span className="text-sm text-gray-600">Helpful:</span>
            <span className="text-sm text-gray-400 ml-2">
              {review.helpful}
            </span>
          </div>

          <div className="mt-2">
            <span className="text-sm text-gray-600">Unhelpful:</span>
            <span className="text-sm text-gray-400 ml-2">
              {review.unhelpful}
            </span>
          </div>
            <div className="flex space-x-2">
                     <img src={review.image} alt="Review" className="mt-2 border border-gray-300 p-2 w-24 h-24" />
         <img src={review.image} alt="Review" className="mt-2 border border-gray-300 p-2 w-24 h-24" />
         <img src={review.image} alt="Review" className="mt-2 border border-gray-300 p-2 w-24 h-24" />

            </div>
    
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
