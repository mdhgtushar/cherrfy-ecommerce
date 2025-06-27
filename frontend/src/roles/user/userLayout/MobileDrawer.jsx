import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Settings, ShoppingCart, Truck, User, X } from 'lucide-react';

// Mock USER_PATHS object to resolve the import error.
// In your actual application, ensure this import points to the correct file.
const USER_PATHS = {
    PROFILE: '/profile',
    ORDER: '/orders',
    CART: '/cart',
    SETTINGS: '/settings',
};

const MobileDrawer = ({
  isOpen,
  onClose,
  user,
  cartItemCount,
  onLogout,
  onLogin,
  onShowSettings,
}) => {

  // A reusable link component for the drawer to avoid repeating class names
  const DrawerLink = ({ to, icon: Icon, children, ...props }) => (
    <Link
      to={to}
      onClick={onClose}
      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors duration-200"
      {...props}
    >
      <Icon className="w-6 h-6 text-gray-500" />
      <span>{children}</span>
    </Link>
  );

  // A reusable button component for the drawer
  const DrawerButton = ({ onClick, icon: Icon, children }) => (
     <button
        onClick={() => {
          onClick();
          onClose(); // Also close the drawer when a button is clicked
        }}
        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium w-full text-left transition-colors duration-200"
      >
        <Icon className="w-6 h-6 text-gray-500" />
        <span>{children}</span>
      </button>
  );


  return (
    <>
      {/* Overlay: Dims the background when the drawer is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="menu-title" className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links and Actions */}
        <nav className="p-4">
          {user ? (
            <div className="space-y-2">
              <DrawerLink to={USER_PATHS.PROFILE} icon={User}>My Profile</DrawerLink>
              <DrawerLink to={USER_PATHS.ORDER} icon={Truck}>My Orders</DrawerLink>
              <DrawerLink to={USER_PATHS.CART} icon={ShoppingCart}>
                Cart ({cartItemCount})
              </DrawerLink>
              <DrawerButton onClick={onShowSettings} icon={Settings}>Settings</DrawerButton>
              <div className="pt-2 mt-2 border-t border-gray-200">
                 <DrawerButton onClick={onLogout} icon={LogOut}>Logout</DrawerButton>
              </div>
            </div>
          ) : (
             <button
                onClick={() => {
                  onLogin();
                  onClose();
                }}
                className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Login / Register
              </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileDrawer;
