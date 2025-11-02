import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import API from "../../../util/API";

// Fetch category data from API
const CategoryNavigationBar = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await API.get("/category");
        setCategoryData(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="hidden md:flex bg-white border-b border-gray-200 shadow-sm">
      <div
        className="container mx-auto px-4 flex items-center justify-center h-12"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        {categoryData.map((category) => (
          <div
            key={category.name}
            className="relative h-full flex items-center"
            onMouseEnter={() => setHoveredCategory(category.name)}
          >
            <a
              href={category.href}
              className="relative px-4 h-full flex items-center text-sm font-medium text-gray-700 hover:text-secondery gap-1 transition-colors"
            >
              {category.name}
              {category.children && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    hoveredCategory === category.name ? "rotate-180" : ""
                  }`}
                />
              )}
              {hoveredCategory === category.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondery" />
              )}
            </a>

            {/* Dropdown menu for subcategories */}
            {hoveredCategory === category.name && category.children && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-max max-w-4xl bg-white border-x border-b border-gray-200 rounded-b-lg shadow-lg p-6 animate-fade-in-down">
                <div className="flex gap-x-10 gap-y-6">
                  {category.children.map((subCategory) => (
                    <div key={subCategory.name} className="flex-1 min-w-[200px]">
                      <a
                        href={subCategory.href}
                        className="font-bold text-gray-800 text-md mb-3 block hover:text-orange-500"
                      >
                        {subCategory.name}
                      </a>
                      <div className="space-y-2">
                        {subCategory.children?.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block text-sm text-gray-600 hover:text-secondery transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile menu
const MobileNavMenu = ({ isOpen, onClose, categoryData }) => {
  const MobileMenuItem = ({ category, level = 0 }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const hasChildren = category.children && category.children.length > 0;

    if (!hasChildren)
      return (
        <a
          href={category.href}
          className="flex items-center gap-4 py-3 hover:bg-gray-100 rounded-md"
          style={{ paddingLeft: `${1 + level * 1.5}rem` }}
        >
          {category.name}
        </a>
      );

    return (
      <div className="border-b last:border-b-0">
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className="w-full flex justify-between items-center py-3 font-medium hover:bg-gray-100 rounded-md pr-2"
        >
          <span className="flex items-center gap-4 pl-4">
            {category.name}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isSubMenuOpen ? "rotate-180 text-orange-500" : ""
            }`}
          />
        </button>
        {isSubMenuOpen && (
          <div className="pl-4 bg-gray-50">
            {category.children.map((child) => (
              <MobileMenuItem
                key={child.name}
                category={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto p-2">
            {categoryData.map((cat) => (
              <MobileMenuItem key={cat.name} category={cat} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

// Combined export
const CategoryHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await API.get("/category");
        setCategoryData(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30">
        <CategoryNavigationBar categoryData={categoryData} />
      </header>

      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categoryData={categoryData}
      />

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
      `}</style>
    </>
  );
};

export default CategoryHeader;
