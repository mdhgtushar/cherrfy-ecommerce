import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTwoRandomProducts, selectThreeRandomProductsForSlides } from '../../../features/productSlice';
import { Link } from 'react-router-dom';

// Remove mock data - will use real product data for both slides and side banners

// --- The HeroPanel Component ---

const HeroPanel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [stableSlides, setStableSlides] = useState([]);
    const [stableSideBanners, setStableSideBanners] = useState([]);
    
    // Get separate random products for slides and side banners
    const slides = useSelector(selectThreeRandomProductsForSlides);
    const sideBannerProducts = useSelector(selectTwoRandomProducts);

    // Stabilize the products to prevent constant re-rendering
    useEffect(() => {
        if (slides.length > 0 && stableSlides.length === 0) {
            setStableSlides(slides);
        }
    }, [slides, stableSlides.length]);

    useEffect(() => {
        if (sideBannerProducts.length > 0 && stableSideBanners.length === 0) {
            setStableSideBanners(sideBannerProducts);
        }
    }, [sideBannerProducts, stableSideBanners.length]);

    // Auto-play functionality for the slider
    useEffect(() => {
        if (stableSlides.length === 0) return;
        
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === stableSlides.length - 1 ? 0 : prev + 1));
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [stableSlides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === stableSlides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? stableSlides.length - 1 : prev - 1));
    };

    return (
        <div className="bg-gray-50 py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6">
                    
                    {/* --- Main Carousel/Slider --- */}
                    <div className="lg:col-span-3 relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden group shadow-lg mb-6 lg:mb-0">
                        {stableSlides.length > 0 ? (
                            stableSlides.map((product, index) => (
                                <div
                                    key={product._id || product.id || index}
                                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img 
                                        src={product.image || product.images?.[0] || 'https://placehold.co/1200x500/3498db/ffffff?text=Product+Image'} 
                                        alt={product.title || product.name || 'Product'} 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className={`absolute inset-0 flex flex-col justify-center p-6 md:p-12 bg-gradient-to-r from-black/60 to-transparent`}>
                                        <h3 className="font-semibold text-lg text-orange-300 animate-fade-in-down-sm">Featured Product</h3>
                                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4 animate-fade-in-down">
                                            {product.title || product.name || 'Amazing Product'}
                                        </h2>
                                        <p className="text-white/90 max-w-md mb-6 animate-fade-in-up">
                                            {product.description ? 
                                                product.description.substring(0, 100) + '...' : 
                                                'Discover this amazing product with great quality and unbeatable price.'
                                            }
                                        </p>
                                        <Link 
                                            to={`/products/${product._id || product.id}`} 
                                            className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg w-fit hover:bg-orange-600 transition-transform hover:scale-105 animate-fade-in-up-sm"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Fallback when no products are available
                            <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-600 mb-2">Loading Products...</h2>
                                    <p className="text-gray-500">Please wait while we load amazing products for you</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Slider Controls */}
                        <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                            <ChevronRight size={24} />
                        </button>

                        {/* Pagination Dots */}
                        {stableSlides.length > 0 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {stableSlides.map((_, index) => (
                                    <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}></button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* --- Side Banners --- */}
                    <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {stableSideBanners.length > 0 ? (
                            stableSideBanners.map((product, index) => (
                                <div key={product._id || product.id || index} className="relative w-full h-[213px] rounded-2xl overflow-hidden group shadow-lg">
                                    <img 
                                        src={product.image || product.images?.[0] || 'https://placehold.co/400x250/9b59b6/ffffff?text=Product+Image'} 
                                        alt={product.title || product.name || 'Product'} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                        <h3 className="text-xl font-bold text-white truncate">{product.title || product.name || 'Featured Product'}</h3>
                                        <p className="text-white/80 text-sm mb-3">
                                            {product.price ? `$${product.price}` : 'Check Price'}
                                        </p>
                                        <a 
                                            href={`/product/${product._id || product.id}`} 
                                            className="text-white font-bold text-sm flex items-center gap-2 hover:text-orange-300 transition-colors w-fit"
                                        >
                                            View Product <ChevronRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Fallback when no products are available
                            <div className="relative w-full h-[213px] rounded-2xl overflow-hidden group shadow-lg bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500">Loading products...</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {/* Additional animation classes */}
            <style>{`
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInDownSm { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUpSm { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fadeInDown 0.6s ease-out 0.2s backwards; }
                .animate-fade-in-down-sm { animation: fadeInDownSm 0.5s ease-out 0.1s backwards; }
                .animate-fade-in-up { animation: fadeInUp 0.6s ease-out 0.3s backwards; }
                .animate-fade-in-up-sm { animation: fadeInUpSm 0.5s ease-out 0.4s backwards; }
            `}</style>
        </div>
    );
};

export default HeroPanel;
