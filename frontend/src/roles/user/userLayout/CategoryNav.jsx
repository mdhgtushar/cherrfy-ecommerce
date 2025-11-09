import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import API from "../../../util/API";

/* ------------------------------
   🖥️ Desktop Category Navigation
------------------------------ */
const CategoryNavigationBar = ({ categoryData }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="hidden md:flex bg-white border-b border-gray-200 shadow-sm">
      <div
        className="container mx-auto px-4 flex items-center justify-center h-12"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="relative h-full flex items-center"
            onMouseEnter={() => setHoveredCategory(category.name)}
          >
            {/* Top-Level Category */}
            <a
              href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative px-4 h-full flex items-center text-sm font-medium text-gray-700 hover:text-orange-500 gap-1 transition-colors"
            >
              {category.name}

              {category.subcategories?.length > 0 && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    hoveredCategory === category.name ? "rotate-180" : ""
                  }`}
                />
              )}

              {hoveredCategory === category.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500" />
              )}
            </a>

            {/* Subcategories Dropdown */}
            {hoveredCategory === category.name &&
              category.subcategories?.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-max max-w-4xl bg-white border-x border-b border-gray-200 rounded-b-lg shadow-lg p-6 animate-fade-in-down">
                  <div className="flex gap-x-10 gap-y-6">
                    {category.subcategories.map((sub) => (
                      <div key={sub._id} className="flex-1 min-w-[200px]">
                        <a
                          href={`#${sub.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="font-bold text-gray-800 text-md mb-3 block hover:text-orange-500"
                        >
                          {sub.name}
                        </a>

                        {/* Nested sub-subcategories (optional) */}
                        {sub.subcategories?.length > 0 && (
                          <div className="space-y-2">
                            {sub.subcategories.map((item) => (
                              <a
                                key={item._id}
                                href={`#${item.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="block text-sm text-gray-600 hover:text-orange-500 transition-colors"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        )}
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

/* ------------------------------
   📱 Mobile Navigation Menu
------------------------------ */
const MobileNavMenu = ({ isOpen, onClose, categoryData }) => {
  const MobileMenuItem = ({ category, level = 0 }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const hasSub = category.subcategories && category.subcategories.length > 0;

    if (!hasSub)
      return (
        <a
          href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
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
          style={{ paddingLeft: `${1 + level * 1.5}rem` }}
        >
          <span>{category.name}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isSubMenuOpen ? "rotate-180 text-orange-500" : ""
            }`}
          />
        </button>

        {isSubMenuOpen && (
          <div className="pl-4 bg-gray-50">
            {category.subcategories.map((child) => (
              <MobileMenuItem
                key={child._id}
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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto p-2">
            {categoryData.map((cat) => (
              <MobileMenuItem key={cat._id} category={cat} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

/* ------------------------------
   🔝 Main Category Header Wrapper
------------------------------ */
const CategoryHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/category");
        setCategoryData(res.data);
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

      {/* 🔸 Animation Style */}
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
