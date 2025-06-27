import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Mock Data for the Hero Panel ---
const slides = [
    {
        pretitle: 'Featured Deal',
        title: 'The Ultimate Sound Experience',
        subtitle: 'Save up to 40% on select premium headphones. Noise cancellation, pure bliss.',
        buttonText: 'Shop Headphones',
        buttonLink: '#',
        image: 'https://placehold.co/1200x500/3498db/ffffff?text=Premium+Headphones',
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
    },
    {
        pretitle: 'New Arrivals',
        title: 'Upgrade Your Style This Summer',
        subtitle: 'Discover the latest trends in fashion. Fresh looks for a fresh season.',
        buttonText: 'Explore Fashion',
        buttonLink: '#',
        image: 'https://placehold.co/1200x500/e74c3c/ffffff?text=Summer+Fashion+2025',
        bgColor: 'bg-red-500',
        textColor: 'text-white',
    },
    {
        pretitle: 'Home Essentials',
        title: 'Smart Living, Simplified',
        subtitle: 'From smart hubs to robotic vacuums, make your home work for you.',
        buttonText: 'View Home Tech',
        buttonLink: '#',
        image: 'https://placehold.co/1200x500/2ecc71/ffffff?text=Smart+Home+Deals',
        bgColor: 'bg-green-500',
        textColor: 'text-white',
    },
];

const sideBanners = [
    {
        title: 'Buy Again',
        subtitle: 'Save big on your faves',
        image: 'https://placehold.co/400x250/f39c12/ffffff?text=Your+Favorites',
        buttonText: 'View Items',
        buttonLink: '#',
    },
    {
        title: 'Top Rated Electronics',
        subtitle: 'Customer-approved tech',
        image: 'https://placehold.co/400x250/9b59b6/ffffff?text=Top+Electronics',
        buttonText: 'Shop Now',
        buttonLink: '#',
    }
];

// --- The HeroPanel Component ---

const HeroPanel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play functionality for the slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="bg-gray-50 py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6">
                    
                    {/* --- Main Carousel/Slider --- */}
                    <div className="lg:col-span-3 relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden group shadow-lg mb-6 lg:mb-0">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                <div className={`absolute inset-0 flex flex-col justify-center p-6 md:p-12 bg-gradient-to-r from-black/60 to-transparent`}>
                                    <h3 className="font-semibold text-lg text-orange-300 animate-fade-in-down-sm">{slide.pretitle}</h3>
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-4 animate-fade-in-down">{slide.title}</h2>
                                    <p className="text-white/90 max-w-md mb-6 animate-fade-in-up">{slide.subtitle}</p>
                                    <a href={slide.buttonLink} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg w-fit hover:bg-orange-600 transition-transform hover:scale-105 animate-fade-in-up-sm">
                                        {slide.buttonText}
                                    </a>
                                </div>
                            </div>
                        ))}
                        
                        {/* Slider Controls */}
                        <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                            <ChevronRight size={24} />
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {slides.map((_, index) => (
                                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}></button>
                            ))}
                        </div>
                    </div>
                    
                    {/* --- Side Banners --- */}
                    <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {sideBanners.map((banner, index) => (
                            <div key={index} className="relative w-full h-[213px] rounded-2xl overflow-hidden group shadow-lg">
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <h3 className="text-xl font-bold text-white">{banner.title}</h3>
                                    <p className="text-white/80 text-sm mb-3">{banner.subtitle}</p>
                                    <a href={banner.buttonLink} className="text-white font-bold text-sm flex items-center gap-2 hover:text-orange-300 transition-colors w-fit">
                                        {banner.buttonText} <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
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
