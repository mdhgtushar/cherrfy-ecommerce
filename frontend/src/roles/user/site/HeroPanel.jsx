import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectTwoRandomProducts,
  selectThreeRandomProductsForSlides,
} from "../../../features/productSlice";
import { Link } from "react-router-dom";

const HeroPanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stableSlides, setStableSlides] = useState([]);
  const [stableSideBanners, setStableSideBanners] = useState([]);

  const slides = useSelector(selectThreeRandomProductsForSlides);
  const sideBannerProducts = useSelector(selectTwoRandomProducts);

  useEffect(() => {
    if (slides.length > 0 && stableSlides.length === 0) setStableSlides(slides);
  }, [slides, stableSlides.length]);

  useEffect(() => {
    if (sideBannerProducts.length > 0 && stableSideBanners.length === 0)
      setStableSideBanners(sideBannerProducts);
  }, [sideBannerProducts, stableSideBanners.length]);

  useEffect(() => {
    if (stableSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === stableSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [stableSlides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === stableSlides.length - 1 ? 0 : prev + 1
    );
  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? stableSlides.length - 1 : prev - 1
    );

  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6">

          {/* --- Compact Main Carousel --- */}
          <div className="lg:col-span-3 relative w-full h-[260px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl group">
            {stableSlides.length > 0 ? (
              stableSlides.map((product, index) => (
                <div
                  key={product._id || index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                >
                  <img
                    src={
                      product.image ||
                      product.images?.[0] ||
                      "https://placehold.co/1200x500/3498db/ffffff?text=Product+Image"
                    }
                    alt={product.title || "Product"}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Text Block (Compact Bottom-Left Position) */}
                  <div className="absolute bottom-6 left-6 max-w-md bg-black/40 backdrop-blur-sm p-5 rounded-xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
                      {product.title || product.name || "Featured Product"}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base mb-3 line-clamp-2">
                      {product.description
                        ? product.description.substring(0, 100) + "..."
                        : "Discover this amazing product crafted for quality and comfort."}
                    </p>
                    <Link
                      to={`/products/${product._id || product.id}`}
                      className="inline-block bg-primary text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-secondary transition-all hover:scale-105"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300 animate-pulse">
                  Loading...
                </p>
              </div>
            )}

            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 p-2.5 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 p-2.5 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all"
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            {stableSlides.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {stableSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-5"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- Side Banners --- */}
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 mt-6 lg:mt-0">
            {stableSideBanners.length > 0 ? (
              stableSideBanners.map((product, index) => (
                <div
                  key={product._id || index}
                  className="relative h-[180px] rounded-xl overflow-hidden shadow-md group"
                >
                  <img
                    src={
                      product.image ||
                      product.images?.[0] ||
                      "https://placehold.co/400x250/9b59b6/ffffff?text=Product+Image"
                    }
                    alt={product.title || "Product"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold truncate">
                      {product.title || "Featured Product"}
                    </h3>
                    <p className="text-white/80 text-sm mb-1">
                      {product.price ? `$${product.price}` : "Check Price"}
                    </p>
                    <Link
                      to={`/product/${product._id || product.id}`}
                      className="text-orange-400 text-sm font-semibold hover:text-orange-300 flex items-center gap-1 transition-all"
                    >
                      View Product <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-xl h-[180px]">
                <p className="text-gray-500 dark:text-gray-300">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPanel;
