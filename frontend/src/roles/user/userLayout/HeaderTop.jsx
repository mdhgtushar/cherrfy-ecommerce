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
import logo from "../../../assets/images/cherrfy-logo.png";

const useSmartDropdown = () => {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShow(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 300);
  };
  const handleMouseClick = () => setShow(false);

  return { show, handleMouseEnter, handleMouseLeave, handleMouseClick };
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
  const initials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
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
        <div className="flex items-center justify-between p-4 border-b border-[#E0E0E0]">
          <h2 className="text-xl font-semibold text-[#333333]">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {user ? (
            <>
              <Link
                to={USER_PATHS.PROFILE}
                className="flex items-center space-x-2 text-gray-700 hover:bg-[#F8F8F8] p-2 rounded"
                onClick={() => setDrawerOpen(false)}
              >
                <User className="text-primary" /> <span>Profile</span>
              </Link>
              <Link
                to={USER_PATHS.ORDER}
                className="flex items-center space-x-2 text-gray-700 hover:bg-[#F8F8F8] p-2 rounded"
                onClick={() => setDrawerOpen(false)}
              >
                <Truck className="text-primary" /> <span>Orders</span>
              </Link>
              <Link
                to={USER_PATHS.CART}
                className="flex items-center space-x-2 text-gray-700 hover:bg-[#F8F8F8] p-2 rounded"
                onClick={() => setDrawerOpen(false)}
              >
                <ShoppingCart className="text-primary" />{" "}
                <span>Cart ({cartItemCount})</span>
              </Link>
              <Link
                to={USER_PATHS.SETTINGS}
                className="flex items-center space-x-2 text-gray-700 hover:bg-[#F8F8F8] p-2 rounded"
                onClick={() => setDrawerOpen(false)}
              >
                <Settings className="text-primary" /> <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:bg-[#F8F8F8] p-2 rounded w-full text-left"
              >
                <LogOut className="text-primary" /> <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setDrawerOpen(false);
                setShowLogin(true);
              }}
              className="text-primary font-semibold w-full text-left p-2 rounded hover:bg-[#F8F8F8]"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="h-12">
            <img src={logo} className="h-full" />
          </Link>
        </div>

        <div className="flex-1 mx-4 hidden md:block">
          <SearchBar />
        </div>

        <div className="items-center space-x-6 md:flex hidden">
          <SettingsPopup />
          <div
            className="relative cursor-pointer text-sm text-gray-600 hover:text-secondery"
            onMouseEnter={loginDropdown.handleMouseEnter}
            onMouseLeave={loginDropdown.handleMouseLeave}
            onClick={loginDropdown.handleMouseClick}
          >
            <div className="flex flex-col">
              <span>Welcome - </span>
              {user ? (
                <span className="font-semibold">{user.name}</span>
              ) : (
                <span className="font-semibold">Login/Register</span>
              )}
            </div>

            {loginDropdown.show && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#E0E0E0] shadow-lg rounded z-50 p-4 w-64">
                <div className="flex items-center space-x-3 border-b border-[#E0E0E0] pb-3">
                  <div className="w-10 h-10 flex-none flex items-center justify-center rounded-full bg-[#D2042D] text-white text-lg font-semibold border">
                    {initials(user?.name || "G")}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#333333]">
                      {user?.name || "Guest"}
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
                        className="flex items-center px-4 py-2 hover:bg-[#F8F8F8] text-gray-700 rounded"
                      >
                        <User className="mr-2 text-primary" /> Profile
                      </Link>
                      <Link
                        to={USER_PATHS.ORDER}
                        className="flex items-center px-4 py-2 hover:bg-[#F8F8F8] text-gray-700 rounded"
                      >
                        <Truck className="mr-2 text-primary" /> Orders
                      </Link>
                      <Link
                        to={USER_PATHS.CART}
                        className="flex items-center px-4 py-2 hover:bg-[#F8F8F8] text-gray-700 rounded"
                      >
                        <ShoppingCart className="mr-2 text-primary" /> Cart
                      </Link>
                      <Link
                        to={USER_PATHS.SETTINGS}
                        className="flex items-center px-4 py-2 hover:bg-[#F8F8F8] text-gray-700 rounded"
                      >
                        <Settings className="mr-2 text-primary" /> Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 hover:bg-[#F8F8F8] text-gray-700 w-full rounded text-left"
                      >
                        <LogOut className="mr-2 text-primary" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to={"/login"}
                      className="text-primary font-semibold w-full text-left px-4 py-2 rounded hover:bg-[#F8F8F8]"
                    >
                      Login / Register
                    </Link>
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
