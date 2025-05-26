import React, { useEffect, useState } from 'react';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            // Example: const res = await fetch('/api/user/reviews');
            // const data = await res.json();
            // setReviews(data);
            // Mock data for demonstration:
            setTimeout(() => {
                setReviews([
                    {
                        id: 1,
                        product: { name: 'Wireless Headphones', image: '/images/headphones.jpg' },
                        rating: 4,
                        comment: 'Great sound quality!',
                        date: '2024-06-10',
                    },
                    {
                        id: 2,
                        product: { name: 'Smart Watch', image: '/images/smartwatch.jpg' },
                        rating: 5,
                        comment: 'Love the features!',
                        date: '2024-05-28',
                    },
                ]);
                setLoading(false);
            }, 800);
        } catch (error) {
            setLoading(false);
            setReviews([]);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
            {loading ? (
                <p className="text-gray-500">Loading your reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">You have not written any reviews yet.</p>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((review) => (
                        <li
                            key={review.id}
                            className="flex items-start border border-gray-200 rounded-lg p-4 bg-white shadow"
                        >
                            <img
                                src={review.product.image}
                                alt={review.product.name}
                                className="w-20 h-20 object-cover rounded-lg mr-4"
                            />
                            <div>
                                <h4 className="text-lg font-medium mb-1">{review.product.name}</h4>
                                <div className="text-yellow-500 mb-1">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="text-gray-700 mb-1">{review.comment}</p>
                                <small className="text-gray-400">Reviewed on {review.date}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyReviews;
