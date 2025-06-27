import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Cpu,
  Shirt,
  Home,
  Smile,
  Book,
  Search,
  Camera,
  DollarSign,
  Globe,
  User,
  ShoppingCart,
  LogOut,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is available for <Link>
import { useDispatch, useSelector } from "react-redux";
import USER_PATHS from "../USER_PATHS";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../../features/userAuthSlice";
import ConfirmDialog from "../../../components/ConfirmDialog";
import SettingsPopup from "./SettingsPopup";

// --- Mock Data & Functions for a Self-Contained Demo ---

// const useSelector = (selector) => {

//     const [isLoggedIn, setIsLoggedIn] = useState(true);

//     useEffect(() => {
//         const buttonId = "login-toggle-button-ultimate";
//         if (document.getElementById(buttonId)) return;

//         const toggleButton = document.createElement('button');
//         toggleButton.id = buttonId;
//         toggleButton.innerText = "Demo: Toggle Login";
//         Object.assign(toggleButton.style, {
//             position: 'fixed', bottom: '10px', right: '10px', zIndex: '1001',
//             padding: '8px 12px', backgroundColor: '#f97316', color: 'white',
//             border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
//         });

//         toggleButton.addEventListener('click', () => setIsLoggedIn(p => !p));
//         document.body.appendChild(toggleButton);

//         return () => { if (toggleButton && toggleButton.parentNode) document.body.removeChild(toggleButton); };
//     }, []);

//     const mockState = {
//         userAuth: {
//             user: isLoggedIn ? {
//                 username: "Jane Doe",
//                 email: "jane.doe@example.com",
//             } : null,
//         },
//         cart: { items: isLoggedIn ? [{}, {}] : [] },
//         userSettings: { selectedCurrency: "USD", shipToCountry: "USA" },
//     };
//     return selector(mockState);
// };

// --- Fully Populated Category Data for Mega Menu ---
const categoryData = [
  {
    name: "Electronics",
    href: "#",
    icon: Cpu,
    children: [
      {
        name: "Phones & Accessories",
        href: "#",
        children: [
          { name: "Smartphones", href: "#" },
          { name: "Cases & Covers", href: "#" },
          { name: "Screen Protectors", href: "#" },
          { name: "Chargers & Cables", href: "#" },
        ],
      },
      {
        name: "Computers & Laptops",
        href: "#",
        children: [
          { name: "Laptops", href: "#" },
          { name: "Desktops", href: "#" },
          { name: "Monitors", href: "#" },
          { name: "Keyboards & Mice", href: "#" },
        ],
      },
      {
        name: "Audio",
        href: "#",
        children: [
          { name: "Headphones", href: "#" },
          { name: "Bluetooth Speakers", href: "#" },
          { name: "Home Theater", href: "#" },
        ],
      },
    ],
  },
  {
    name: "Fashion",
    href: "#",
    icon: Shirt,
    children: [
      {
        name: "Men's Fashion",
        href: "#",
        children: [
          { name: "T-Shirts & Polos", href: "#" },
          { name: "Jeans & Trousers", href: "#" },
          { name: "Footwear", href: "#" },
          { name: "Watches", href: "#" },
        ],
      },
      {
        name: "Women's Fashion",
        href: "#",
        children: [
          { name: "Dresses & Gowns", href: "#" },
          { name: "Tops & Tees", href: "#" },
          { name: "Handbags", href: "#" },
          { name: "Jewelry", href: "#" },
        ],
      },
      {
        name: "Kid's Fashion",
        href: "#",
        children: [
          { name: "Clothing", href: "#" },
          { name: "Shoes", href: "#" },
          { name: "Accessories", href: "#" },
        ],
      },
    ],
  },
  { name: "Home & Kitchen", href: "#", icon: Home },
  { name: "Beauty", href: "#", icon: Smile },
  { name: "Books", href: "#", icon: Book },
];

// --- Sub-Components (Internal to UltimateHeader) ---

const TopBar = ({ onMobileNavOpen }) => {
  const { user } = useSelector((state) => state.userAuth);
  const { items: cartItems = [] } = useSelector((state) => state.cart);
  const { selectedCurrency, shipToCountry } = useSelector(
    (state) => state.userSettings
  );

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLogout = () => setOpen(true);
  const dispatch = useDispatch();
  const confirmLogout = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("Logout successful.");
  };
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
         
      <div className="container mx-auto px-4">
       
        <ConfirmDialog
        isOpen={open}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setOpen(false)}
        onConfirm={confirmLogout}
      />
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onMobileNavOpen}
              className="md:hidden block text-gray-700 p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link
              to="/"
              className="font-bold text-2xl md:text-3xl tracking-tight text-orange-500 hover:text-orange-600"
            >
              CHERRFY
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:flex">
            <form className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, and more"
                className="w-full pl-12 pr-28 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button
                  type="button"
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <div className="h-5 border-l border-gray-300 mx-2"></div>
                <button
                  type="submit"
                  className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
          <SettingsPopup />
          {/* User Actions */}
          <div className="items-center space-x-1 md:space-x-2 flex">
            {/* --- NEW: Combined Settings Dropdown --- */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setShowSettingsDropdown(true)}
              onMouseLeave={() => setShowSettingsDropdown(false)}
            >
              <div className="flex items-center text-gray-600 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <Globe size={22} />
                <ChevronDown size={16} className="ml-1" />
              </div>
              {showSettingsDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border shadow-xl rounded-lg z-30 w-64 p-3 animate-fade-in-down-sm">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Language & Currency
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 hover:bg-gray-100 rounded-md">
                      <label className="text-xs text-gray-500">Language</label>
                      <p className="font-medium text-gray-700">English</p>
                    </div>
                    <div className="p-2 hover:bg-gray-100 rounded-md">
                      <label className="text-xs text-gray-500">Currency</label>
                      <p className="font-medium text-gray-700">
                        {selectedCurrency}
                      </p>
                    </div>
                    <div className="p-2 hover:bg-gray-100 rounded-md">
                      <label className="text-xs text-gray-500">Ship To</label>
                      <p className="font-medium text-gray-700">
                        {shipToCountry}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative hidden md:block"
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <div className="flex items-center space-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <User size={24} />
                <span className="text-sm font-medium">
                  {user ? `Hi, ${user.username.split(" ")[0]}` : <Link to={USER_PATHS.LOGIN}>Login/Register</Link>}
                </span>
              </div>
              {user && showUserDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border shadow-xl rounded-lg z-30 w-52 p-2 animate-fade-in-down-sm">
                  <Link
                    to={USER_PATHS.PROFILE}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link
                    to={USER_PATHS.ORDER}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md"
                  >
                    <Truck size={18} />
                    Orders
                  </Link>
                  <div className="my-1 border-t"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
            <Link
              to={USER_PATHS.CART}
              className="relative p-2 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart size={28} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryNavigationBar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
              className="relative px-4 h-full flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 gap-1 transition-colors"
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
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500" />
              )}
            </a>
            {/* --- NEW: Render Full Mega Menu --- */}
            {hoveredCategory === category.name && category.children && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-max max-w-4xl bg-white border-x border-b border-gray-200 rounded-b-lg shadow-lg p-6 animate-fade-in-down">
                <div className="flex gap-x-10 gap-y-6">
                  {category.children.map((subCategory) => (
                    <div
                      key={subCategory.name}
                      className="flex-1 min-w-[200px]"
                    >
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
                            className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
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

const MobileNavMenu = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.userAuth);
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
          {category.icon && level === 0 && <category.icon size={20} />}
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
            {category.icon && <category.icon size={20} />}
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
          <div className="p-4 border-b">
            {user ? (
              <div className="flex items-center gap-3">
                <User
                  size={40}
                  className="bg-gray-200 p-2 rounded-full text-gray-600"
                />
                <div>
                  <h2 className="font-bold">{user.username}</h2>
                  <p className="text-sm text-gray-500">View Profile</p>
                </div>
              </div>
            ) : (
              <button className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg">
                Login / Register
              </button>
            )}
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {categoryData.map((cat) => (
              <MobileMenuItem key={cat.name} category={cat} />
            ))}
          </nav>
          {user && (
            <div className="p-4 border-t">
              <button className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// --- The UltimateHeader Component ---

const UltimateHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30">
        <TopBar onMobileNavOpen={() => setIsMobileMenuOpen(true)} />
        <CategoryNavigationBar />
      </header>

      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInDownSm {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fadeInDown 0.3s ease-out forwards; }
                .animate-fade-in-down-sm { animation: fadeInDownSm 0.2s ease-out forwards; }
            `}</style>
    </>
  );
};

export default UltimateHeader;
