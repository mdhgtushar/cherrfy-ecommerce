import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LogOut,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../../../features/userAuthSlice";
import SearchBar from "./SearchBar";
import USER_PATHS from "../USER_PATHS";
import SettingsPopup from "./SettingsPopup";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { toast } from "react-toastify";
import LoginModal from "../../user/auth/LoginModal";

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
    handleMouseClick,
  };
};

const HeaderTop = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user } = useSelector((state) => state.userAuth);
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.items.length || 0;

  const handleLogout = () => setOpen(true);

  const confirmLogout = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("Logout successful.");
  };

  const loginDropdown = useSmartDropdown();

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md bg-gray-100">
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

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {user ? (
            <>
              <Link
                to={USER_PATHS.PROFILE}
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setDrawerOpen(false)}
              >
                <User className="text-red-500" />
                <span>Profile</span>
              </Link>
              <Link
                to={USER_PATHS.ORDER}
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setDrawerOpen(false)}
              >
                <Truck className="text-red-500" />
                <span>Orders</span>
              </Link>
              <Link
                to={USER_PATHS.CART}
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setDrawerOpen(false)}
              >
                <ShoppingCart className="text-red-500" />
                <span>Cart ({cartItemCount})</span>
              </Link>
              <Link
                to={USER_PATHS.SETTINGS}
                className="flex items-center space-x-2 text-gray-700"
                onClick={() => setDrawerOpen(false)}
              >
                <Settings className="text-red-500" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700"
              >
                <LogOut className="text-red-500" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setDrawerOpen(false);
                setShowLogin(true);
              }}
              className="text-red-600 font-semibold"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side - Logo + Drawer icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden block text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="font-bold text-2xl border-2 p-1 px-5 rounded hover:shadow-md"
            style={{ color: "#e6931d", borderColor: "#e6931d" }}
          >
            CHERRFY
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 mx-4 hidden md:block">
          <SearchBar />
        </div>

        {/* Right - Desktop only */}
        <div className="items-center space-x-6 md:flex hidden">
          <SettingsPopup />
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
              <div className="absolute top-full right-0 mt-2 bg-white border shadow-lg rounded z-50 p-2 w-64">
                <div className="flex items-center space-x-3 border-b pb-3">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {user?.username || "Guest"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {user?.email || "Please Login"}
                    </p>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  {user ? (
                    <>
                      <Link
                        to={USER_PATHS.PROFILE}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <User className="mr-2 text-red-500" />
                        Profile
                      </Link>
                      <Link
                        to={USER_PATHS.ORDER}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <Truck className="mr-2 text-red-500" />
                        Orders
                      </Link>
                      <Link
                        to={USER_PATHS.CART}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <ShoppingCart className="mr-2 text-red-500" />
                        Cart
                      </Link>
                      <Link
                        to={USER_PATHS.SETTINGS}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <Settings className="mr-2 text-red-500" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700 w-full text-left"
                      >
                        <LogOut className="mr-2 text-red-500" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-red-600 font-semibold w-full text-left px-4 py-2"
                    >
                      Login / Register
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
