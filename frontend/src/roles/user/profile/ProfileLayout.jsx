import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import USER_PATHS from "../../USER_PATHS";

const menuItems = [
  { name: "Overview", url: USER_PATHS.PROFILE },
  { name: "Manage Account", url: USER_PATHS.MANAGEPROFILE },
  { name: "My Orders", url: USER_PATHS.ORDER },
  { name: "Return & Refund", url: USER_PATHS.RETURN_AND_REFUND },
  { name: "My Reviews", url: USER_PATHS.MY_REVIEWS },
  { name: "Wishlist / Followed Stores", url: USER_PATHS.WISHLIST_AND_FOLLOWED_STORES },
  { name: "Appeal / Dispute Center", url: USER_PATHS.APPEAL_DISPUTE_CENTER },
  { name: "Settings", url: USER_PATHS.SETTINGS },
];

const ProfileLayout = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const currentUrl = location.pathname;
    const foundItem = menuItems.find((item) => item.url === currentUrl);
    if (foundItem) {
      setActive(foundItem.name);
    }
  }, [location]);

  return (
    <div className="min-h-screen md:flex mb-5">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white border m-2 md:m-0 md:mr-2 h-full">
        <div className="p-6 font-bold text-xl border-b text-blue-600">User Dashboard</div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              to={item.url}
              key={item.url}
              className={`w-full block text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
                active === item.name ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-2 md:p-4 bg-gray-50 ">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;

