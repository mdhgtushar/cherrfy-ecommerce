import React from 'react';

const WishlistAndStores = () => {
  // Dummy data
  const wishlist = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: '$59.99',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: '$120.00',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const followedStores = [
    {
      id: 1,
      name: 'TechBazaar',
      followers: '25.3K followers',
    },
    {
      id: 2,
      name: 'StylePoint',
      followers: '10.1K followers',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Wishlist Section */}
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 mb-6">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {wishlist.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Followed Stores Section */}
      <h2 className="text-2xl font-semibold mb-4">Followed Stores</h2>
      {followedStores.length === 0 ? (
        <p className="text-gray-600">You're not following any stores yet.</p>
      ) : (
        <ul className="space-y-4">
          {followedStores.map((store) => (
            <li
              key={store.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-gray-600 text-sm">{store.followers}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">Unfollow</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistAndStores;
