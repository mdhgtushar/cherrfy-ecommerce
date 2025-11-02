import React, { use } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import * as Icons from "lucide-react"; // ✅ Import all Lucide icons dynamically
import USER_PATHS from "../../USER_PATHS";
import { useSelector } from "react-redux";

const siteName = "CHERRFY";



// Function to generate user initials


// 🔥 Build navigation items with automatic active detection
function buildNavItems(currentPath) {
  const unreadNotifications = 5;
  const ordersInTransit = 1;
  const availableVouchers = 3;

  return [
    {
      title: "Overview",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: "LayoutGrid",
          href: USER_PATHS.PROFILE,
          active: currentPath === USER_PATHS.PROFILE,
          count: unreadNotifications,
        },
      ],
    },
    {
      title: "Order Management",
      items: [
        {
          key: "orders",
          label: "Orders",
          icon: "Package",
          href: USER_PATHS.ORDER,
          active: currentPath === USER_PATHS.ORDER,
          count: ordersInTransit,
        },
        {
          key: "returns",
          label: "Returns & Refunds",
          icon: "RefreshCw",
          href: USER_PATHS.RETURN_AND_REFUND,
          active: currentPath === USER_PATHS.RETURN_AND_REFUND,
        },
      ],
    },
    {
      title: "Account Management",
      items: [
        {
          key: "account-settings",
          label: "Account Settings",
          icon: "Settings",
          href: USER_PATHS.MANAGEPROFILE,
          active: currentPath === USER_PATHS.MANAGEPROFILE,
        },
        {
          key: "addresses",
          label: "Shipping Addresses",
          icon: "MapPin",
          href: USER_PATHS.ADDRESS,
          active: currentPath === USER_PATHS.ADDRESS,
        },
        {
          key: "payments",
          label: "Payment Methods",
          icon: "CreditCard",
          href: USER_PATHS.PAYMENT,
          active: currentPath === USER_PATHS.PAYMENT,
        },
        {
          key: "vouchers",
          label: "Vouchers & Coupons",
          icon: "Gift",
          href: USER_PATHS.VAUCHERS,
          active: currentPath === USER_PATHS.VAUCHERS,
          count: availableVouchers,
        },
        {
          key: "wishlist",
          label: "Wishlist / Favourites",
          icon: "Heart",
          href: USER_PATHS.WISHLIST_AND_FOLLOWED_STORES,
          active: currentPath === USER_PATHS.WISHLIST_AND_FOLLOWED_STORES,
        },
        {
          key: "reviews",
          label: "Product Reviews",
          icon: "Star",
          href: USER_PATHS.MY_REVIEWS,
          active: currentPath === USER_PATHS.MY_REVIEWS,
        },
      ],
    },
    {
      title: "Help & Support",
      items: [
        {
          key: "disputes",
          label: "Disputes / Tickets",
          icon: "LifeBuoy",
          href: USER_PATHS.APPEAL_DISPUTE_CENTER,
          active: currentPath === USER_PATHS.APPEAL_DISPUTE_CENTER,
        },
      ],
    },
  ];
}

export default function SharedLayout({
  pageTitle = `${siteName} - Account`,
}) {
  const location = useLocation();
  const navGroups = buildNavItems(location.pathname);
  const userData = useSelector((state) => state.userAuth.user);
const user = {
  name: userData.username,
  email: userData.email,
  tier: "Gold Member",
};
const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
};
  return (
    <div className="min-h-screen antialiased text-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12">
        <h1 className="text-2xl font-semibold text-[#333333] mb-6">
          {pageTitle}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white border border-[#E0E0E0] rounded-md p-0 h-fit sticky top-8">
            {/* User Info */}
            <div className="p-6 pb-4 border-b border-[#E0E0E0] mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-none flex items-center justify-center rounded-full bg-[#D2042D] text-white text-lg font-semibold mr-3 shadow-md">
                  {initials(user.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#333333] truncate">
                    {user.name}
                  </p>
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                    {user.tier}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4">
              {navGroups.map((group) => (
                <div key={group.title} className="mb-4 first:mt-0">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2 px-2">
                    {group.title}
                  </h3>

                  <nav className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = Icons[item.icon];

                      return (
                        <Link
                          key={item.key}
                          to={item.href}
                          className={`flex items-center text-sm transition rounded px-3 py-2 ${
                            item.active
                              ? "bg-[#FEE7E8] text-[#D2042D] font-semibold"
                              : "text-gray-700 hover:bg-gray-100 hover:text-[#333333]"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              size={18}
                              className={`mr-3 ${
                                item.active
                                  ? "text-[#D2042D]"
                                  : "text-gray-500"
                              }`}
                            />
                          )}
                          <span className="flex-grow">{item.label}</span>
                          {!!item.count && (
                            <span className="ml-auto flex-none px-2 py-0.5 text-xs font-semibold bg-[#D2042D] text-white rounded-full">
                              {item.count}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
