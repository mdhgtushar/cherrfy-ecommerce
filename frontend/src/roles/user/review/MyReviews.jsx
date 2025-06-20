import React, { useState } from 'react';

const dummyReviews = [
  {
    id: 1,
    product: 'Wireless Headphones',
    rating: 5,
    comment: 'Excellent sound quality and battery life!',
    date: '2025-05-10',
  },
  {
    id: 2,
    product: 'USB-C Cable',
    rating: 3,
    comment: 'Works fine, but build quality could be better.',
    date: '2025-04-22',
  },
  {
    id: 3,
    product: 'Gaming Mouse',
    rating: 4,
    comment: 'Great precision and feel, good value for money.',
    date: '2025-03-12',
  },
  {
    id: 4,
    product: 'Smart Watch',
    rating: 2,
    comment: 'Battery drains too fast, not satisfied.',
    date: '2025-02-01',
  },
];

const MyReviews = () => {
  const [filter, setFilter] = useState('All');

  const filteredReviews =
    filter === 'All'
      ? dummyReviews
      : dummyReviews.filter((r) => r.rating === parseInt(filter));

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">My Reviews</h1>

      {/* Filter Bar */}
      <div className="flex gap-3 flex-wrap">
        {['All', 5, 4, 3, 2, 1].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded border ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {f === 'All' ? 'All Ratings' : `${f} ★`}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <p className="text-gray-600">No reviews found for this filter.</p>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-medium">{review.product}</h2>
                <span className="text-yellow-500 font-bold">
                  {'★'.repeat(review.rating)}
                  <span className="text-gray-400">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
              <p className="text-xs text-gray-400">Reviewed on {review.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReviews;
