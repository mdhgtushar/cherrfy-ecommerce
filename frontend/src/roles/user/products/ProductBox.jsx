// src/components/products/ProductBox.jsx

import React, { useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cartSlice";
import { addToWishlist, removeFromWishlist } from '../../../features/wishlistSlice';

// --- Self-contained SVG Icon Components for easy use ---
const ChevronLeftIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
);

// Use the existing HeartIcon SVG for wishlist
const HeartIcon = ({ filled = false, ...props }) => (
  <svg {...props} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'currentColor' : 'currentColor'}
    />
  </svg>
);

const ProductBox = memo(({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipToCountry } = useSelector((state) => state.userSettings);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some(item => item && item.product && item.product._id === product._id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const handleImageNavigation = (direction, e) => {
    e.preventDefault(); e.stopPropagation();
    if (isAnimating || product.images.length <= 1) return;
    setIsAnimating(true);
    setActiveImageIndex(direction === 'next' ? (activeImageIndex + 1) % product.images.length : (activeImageIndex - 1 + product.images.length) % product.images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleActionClick = (e, handler) => {
    e.preventDefault(); e.stopPropagation();
    handler();
  };
  
  const handleWishlistClick = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1, image: product.images[0], sku_id: product.sku.sku_id }));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1, image: product.images[0], sku_id: product.sku.sku_id }));
    navigate('/checkout');
  };

  if (!product) return null;

  const isOutOfStock = product.availableStock === 0;

  return (
    <a href={`/#/products/${product._id}`} target="_blank" rel="noopener noreferrer" className="block rounded-lg shadow-md hover:shadow-2xl focus:shadow-2xl transition-all duration-300 group perspective-1000" style={{ transform: 'translateZ(0)' }}>
      <div className={`bg-white rounded-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 group-hover:scale-105 group-focus:scale-105 ${isOutOfStock ? 'grayscale' : ''}`}>
        
        {/* --- Image Area with 3D Cube and Overlay --- */}
        <div className="relative w-full h-60 bg-gray-100">
          <div className="absolute w-full h-full transform-style-3d transition-transform duration-500 ease-in-out" style={{ transform: `rotateY(${-activeImageIndex * 90}deg)` }}>
            {product.images.map((imgSrc, index) => (
              <div key={index} className="absolute w-full h-full backface-hidden" style={{ transform: `rotateY(${index * 90}deg) translateZ(120px)` }}>
                <img src={imgSrc} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>

          {/* --- The Interactive Overlay --- */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 group-focus:bg-opacity-50 transition-all duration-300 flex flex-col justify-between p-3">
            {/* Top Bar: Wishlist & Sale Badge */}
            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 delay-100">
                {product.originalPrice ? <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">SALE</div> : <div />}
                <button onClick={handleWishlistClick} className={`transition-colors ${isWishlisted ? 'text-red-500' : 'text-white'}`}>
                  <HeartIcon filled={isWishlisted} className="w-7 h-7" />
                </button>
            </div>

            {/* Middle: Navigation Arrows */}
            <div className="flex-grow flex items-center justify-between opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                <button onClick={(e) => handleImageNavigation('prev', e)} className="text-white/70 hover:text-white transition-colors disabled:opacity-20" disabled={isAnimating}><ChevronLeftIcon className="w-8 h-8"/></button>
                <button onClick={(e) => handleImageNavigation('next', e)} className="text-white/70 hover:text-white transition-colors disabled:opacity-20" disabled={isAnimating}><ChevronRightIcon className="w-8 h-8"/></button>
            </div>
            
            {/* Bottom: Action Buttons & Pagination */}
            <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 delay-100">
                <div className="flex flex-col items-center gap-2">
                    <button onClick={(e) => handleActionClick(e, handleBuyNow)} className="w-full bg-brand-orange text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">Buy Now</button>
                    <button onClick={(e) => handleActionClick(e, handleAddToCart)} className="w-full bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black/50 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">Add to Cart</button>
                </div>
                {product.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3">
                        {product.images.map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full transition-colors ${activeImageIndex === index ? 'bg-white' : 'bg-white/50'}`} />
                        ))}
                    </div>
                )}
            </div>
          </div>
          {isOutOfStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="px-4 py-2 bg-black text-white font-bold rounded">OUT OF STOCK</span></div>}
        </div>

        {/* --- Product Info Panel --- */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 title={product.name} className="text-md font-semibold text-gray-800 h-12 overflow-hidden">{product.name}</h2>
          <div className="flex items-baseline gap-2 mt-auto">
            <p className="text-xl font-bold text-gray-900">{product.currency}{product.price}</p>
            {product.sku.sku_price && <p className="text-sm text-gray-500 line-through">{product.currency}{product.sku.sku_price}</p>}
          </div>
        </div>
      </div>
    </a>
  );
});

export default ProductBox;
