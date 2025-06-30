import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../../../features/wishlistSlice';
import { fetchFollowedStores, unfollowStore } from '../../../features/followedStoresSlice';

const WishlistAndStores = () => {
  const dispatch = useDispatch();
  const { items: wishlist, loading: wishlistLoading, error: wishlistError } = useSelector((state) => state.wishlist);
  const { items: followedStores, loading: storesLoading, error: storesError } = useSelector((state) => state.followedStores);

  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchFollowedStores());
  }, [dispatch]);

  const handleRemoveWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleUnfollowStore = (storeId) => {
    dispatch(unfollowStore(storeId));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Wishlist Section */}
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlistLoading ? (
        <p>Loading wishlist...</p>
      ) : wishlistError ? (
        <p className="text-red-500">{wishlistError}</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-600 mb-6">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {wishlist.map((item) => (
            <div key={item.product._id} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
              <img src={item.product.images?.[0] || 'https://via.placeholder.com/100'} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-gray-600">{item.product.price ? `$${item.product.price}` : ''}</p>
              </div>
              <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveWishlist(item.product._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Followed Stores Section */}
      <h2 className="text-2xl font-semibold mb-4">Followed Stores</h2>
      {storesLoading ? (
        <p>Loading followed stores...</p>
      ) : storesError ? (
        <p className="text-red-500">{storesError}</p>
      ) : followedStores.length === 0 ? (
        <p className="text-gray-600">You're not following any stores yet.</p>
      ) : (
        <ul className="space-y-4">
          {followedStores.map((item) => (
            <li
              key={item.store._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-medium">{item.store.name}</h3>
                <p className="text-gray-600 text-sm">{item.store.email}</p>
              </div>
              <button className="text-red-500 hover:text-red-700" onClick={() => handleUnfollowStore(item.store._id)}>Unfollow</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistAndStores;
