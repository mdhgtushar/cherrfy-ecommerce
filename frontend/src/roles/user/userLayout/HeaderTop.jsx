import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCheck, ListOrdered, LogOut, Settings, ShoppingCart, Truck, User } from "lucide-react";
import { logout } from "../../../features/userAuthSlice";
import SearchBar from "./SearchBar";
import USER_PATHS from "../USER_PATHS";
import SettingsPopup from "./SettingsPopup";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { toast } from "react-toastify";
import LoginModal from "../../user/LoginModal"; 

const useSmartDropdown = () => {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 300);
  };
  const handleMouseClick = () => {
      setShow(false);
  };
  return {
    show,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseClick
  };
};

const HeaderTop = () => {
  const dispatch = useDispatch();

  //states
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  //redux states
  const { user } = useSelector((state) => state.userAuth);
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.items.length || 0;

  //handlers
  const handleLogout = () => setOpen(true);

  const confirmLogout = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("Logout successful.");
  };

  // Dropdown hooks
  const downloadDropdown = useSmartDropdown();
  const languageDropdown = useSmartDropdown();
  const loginDropdown = useSmartDropdown();

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md bg-gray-100 overflow-hidden md:overflow-visible">
      <LoginModal
        isOpen={showLogin}
        onClose={() => {
          setShowLogin(false);
          setOpen(false);
        }}
      />
      <ConfirmDialog
        isOpen={open}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setOpen(false)}
        onConfirm={confirmLogout}
      />
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center border-2 p-1 px-5 rounded hover:shadow-md"
          style={{ borderColor: "#e6931d" }}
        >
          <Link
            to="/"
            className="font-bold text-2xl"
            style={{ color: "#e6931d" }}
          >
            <span>CHERRFY</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 ml-4 mr-0 md:mx-8">
          <SearchBar />
        </div>

        {/* Right Side Menu */}
        <div className="items-center space-x-6 md:flex hidden">
          <SettingsPopup />
          {/* Cart Section */}

          {/* Download App Dropdown */}
          {/* <div
            className="relative cursor-pointer"
            onMouseEnter={downloadDropdown.handleMouseEnter}
            onMouseLeave={downloadDropdown.handleMouseLeave}
          >
            <div className="flex items-center">
              <svg
                viewBox="0 0 1024 1024"
                width="20"
                height="20"
                className="text-gray-600 hover:text-red-600"
              >
                <circle cx="512" cy="512" r="400" fill="gray" />
              </svg>
              <div className="ml-2">
                <div className="text-xs text-gray-500">Download the</div>
                <div className="font-semibold text-sm flex items-center">
                  <span>Cherrfy app</span>
                  <svg
                    viewBox="0 0 1024 1024"
                    width="12"
                    height="12"
                    className="ml-1"
                  >
                    <path d="M296.256 354.944l224 224 224-224a74.656..." />
                  </svg>
                </div>
              </div>
            </div>
            {downloadDropdown.show && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg rounded z-50">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Download for Android
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Download for iOS
                </a>
              </div>
            )}
          </div> */}

          {/* Language/Currency Dropdown */}
          {/* <div
            className="relative cursor-pointer"
            onMouseEnter={languageDropdown.handleMouseEnter}
            onMouseLeave={languageDropdown.handleMouseLeave}
          >
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-blue-500 mr-1"></div>
              <div className="text-sm">
                <div className="text-xs text-gray-500">EN/</div>
                <div className="font-semibold flex items-center">
                  <span>BDT</span>
                  <svg
                    viewBox="0 0 1024 1024"
                    width="12"
                    height="12"
                    className="ml-1"
                  >
                    <path d="M296.256 354.944l224 224 224-224a74.656..." />
                  </svg>
                </div>
              </div>
            </div>
            {languageDropdown.show && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg rounded z-50">
                <div className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                  Language: English / Bangla
                </div>
                <div className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                  Currency: BDT / USD
                </div>
              </div>
            )}
          </div> */}

          {/* Login/Register Dropdown */}
          <div
            className="relative cursor-pointer text-sm text-gray-600 hover:text-red-600"
            onMouseEnter={loginDropdown.handleMouseEnter}
            onMouseLeave={loginDropdown.handleMouseLeave}
            onClick={loginDropdown.handleMouseClick}
          >
            <div className="flex flex-col">
              <span>Welcome - </span>
              {user ? (
                <span className="font-semibold">{user.username}</span>
              ) : (
                <span className="font-semibold">Login/Register</span>
              )}
            </div>
            {loginDropdown.show && (
              <div className="absolute top-full right-0 mt-2 bg-white border shadow-lg rounded z-1 p-2">
                <div className="flex flex-col md:flex-row items-center bg-white p-4 w-64 border-b">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full border-4 border-red-500"
                  />
                  <div className="ml-0 md:ml-3 mt-4 md:mt-0 text-center md:text-left">
                    <h2 className="text-xl font-semibold">
                      {user ? user.username : "Guest"}
                    </h2>
                    <p className="text-gray-600">
                      {user ? user.email : "Please Login"}
                    </p>
                  </div>
                </div>

                {user ? (
                  <>
                    <Link
                      to={USER_PATHS.PROFILE}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                     <User className="mr-2 text-red-500" /> Profile
                    </Link>
                    <Link
                      to={USER_PATHS.ORDER}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <Truck className="mr-2 text-red-500" /> Orders
                    </Link>
                    <Link
                      to={USER_PATHS.CART}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <ShoppingCart className="mr-2 text-red-500" /> Cart
                    </Link>
                    <Link
                      to={USER_PATHS.SETTINGS}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <Settings className="mr-2 text-red-500" /> Settings
                    </Link>
                    

                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-red-100 hover:text-red-600 text-gray-700 w-full text-left flex items-center bg-red-500 text-white mt-5"
                    >
                     <LogOut />  Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700 w-full text-left"
                    >
                      Login
                    </button>
                    {/* <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Login
                    </Link> */}
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div>
            <Link to="/cart" className="flex items-center text-sm">
              <div className="flex items-center hover:text-red-600 cursor-pointer">
                <ShoppingCart className="mr-1 w-5 h-5 text-2xl" />
                <div className="text-sm">
                  <div className="text-xs text-gray-500 px-2 py-0 bg-gray-100 rounded-full text-black text-center">
                    {cartItemCount}
                  </div>
                  <div className="font-semibold flex items-center">
                    <span>Cart</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
