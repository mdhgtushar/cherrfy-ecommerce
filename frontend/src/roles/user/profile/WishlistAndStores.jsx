import React from 'react'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchWishlist } from '../../../features/wishlistSlice';
import { useEffect } from 'react';

export default function Wishlist(){
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

   useEffect (() => {
    dispatch(fetchWishlist());
  },[]);
 


  return (
    <div activeKey="wishlist" pageTitle="Wishlist / Favourites">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Wishlist / Favourites</div>
        <div className="p-6">
          <p className="text-sm text-gray-600">Items you love. Move them to cart when you're ready.</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlistItems.map((i, idx)=> (
              <div key={idx} className="bg-white border border-[#E0E0E0] rounded">
                <div className="h-28 bg-gray-100"></div>
                <div className="p-3">
                  <p className="text-sm font-medium text-[#333333]">{i.title}</p>
                  <p className="text-sm text-[#D2042D] font-semibold">${i.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <a href="#" className="text-xs bg-[#D2042D] hover:bg-[#FA0F3E] text-white px-2 py-1 rounded">Add to Cart</a>
                    <a href="#" className="text-xs text-gray-500 hover:underline">Remove</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
