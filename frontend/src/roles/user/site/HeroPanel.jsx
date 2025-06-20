const HeroPanel = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Discover the Best Deals <br />
            <span className="text-orange-500">on Everyday Products</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Shop smarter, live better. Find quality products at unbeatable
            prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
              Shop Now
            </button>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-100 transition duration-300">
              Browse Categories
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 h-[200px] flex items-center justify-center overflow-hidden">
          <img
            src="https://ae01.alicdn.com/kf/S8f9981edafa645ab8f36d880e6adf84aD.jpg"
            alt="Shopping Illustration"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroPanel;
