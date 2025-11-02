import React from 'react';

// Shared layout wrapper for account pages
// Tailwind CSS classes assume Tailwind v3+ with arbitrary color support
// Example colors used: #D2042D (primary), #FA0F3E (hover), #333333 (dark text), #F8F8F8 (light gray bg), #E0E0E0 (borders)

const siteName = 'CHERRFY';

const user = {
  name: 'Al Sadman Awal',
  email: 'sadmanawal333@gmail.com',
  tier: 'Gold Member',
};

const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
};

function buildNavItems(active) {
  const unreadNotifications = 5;
  const ordersInTransit = 1;
  const availableVouchers = 3;
  return [
    {
      title: 'Overview',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: 'layout-grid', href: 'profile.php', active: active === 'dashboard', count: unreadNotifications },
      ],
    },
    {
      title: 'Order Management',
      items: [
        { key: 'orders', label: 'Orders', icon: 'package', href: 'orders.php', active: active === 'orders', count: ordersInTransit },
        { key: 'returns', label: 'Returns & Refunds', icon: 'refresh-cw', href: 'returns.php', active: active === 'returns' },
      ],
    },
    {
      title: 'Account Management',
      items: [
        { key: 'account-settings', label: 'Account Settings', icon: 'settings', href: 'account-settings.php', active: active === 'account-settings' },
        { key: 'addresses', label: 'Shipping Addresses', icon: 'map-pin', href: 'addresses.php', active: active === 'addresses' },
        { key: 'payments', label: 'Payment Methods', icon: 'credit-card', href: 'payments.php', active: active === 'payments' },
        { key: 'vouchers', label: 'Vouchers & Coupons', icon: 'gift', href: 'vouchers.php', active: active === 'vouchers', count: availableVouchers },
        { key: 'wishlist', label: 'Wishlist / Favourites', icon: 'heart', href: 'wishlist.php', active: active === 'wishlist' },
        { key: 'reviews', label: 'Product Reviews', icon: 'star', href: 'reviews.php', active: active === 'reviews' },
      ],
    },
    {
      title: 'Help & Support',
      items: [
        { key: 'disputes', label: 'Disputes / Tickets', icon: 'life-buoy', href: 'disputes.php', active: active === 'disputes' },
      ],
    },
  ];
}

export default function SharedLayout({ activeKey = '', pageTitle = `${siteName} - Account`, children }) {
  const navGroups = buildNavItems(activeKey);
  return (
    <div className="bg-[#F8F8F8] min-h-screen antialiased text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <h1 className="text-2xl font-semibold text-[#333333] mb-6">{pageTitle}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 bg-white border border-[#E0E0E0] rounded-md p-0 h-fit sticky top-8">
            <div className="p-6 pb-4 border-b border-[#E0E0E0] mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-none flex items-center justify-center rounded-full bg-[#D2042D] text-white text-lg font-semibold mr-3 shadow-md">
                  {initials(user.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#333333] truncate">{user.name}</p>
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                    {user.tier}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              {navGroups.map((group) => (
                <div key={group.title} className="mb-4 first:mt-0">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2 px-2">
                    {group.title}
                  </h3>
                  <nav className="space-y-1">
                    {group.items.map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        className={`flex items-center text-sm text-gray-700 transition rounded hover:bg-gray-100 hover:text-[#333333] px-3 py-2 ${
                          item.active ? 'bg-[#FEE7E8] text-[#D2042D] font-semibold' : ''
                        }`}
                      >
                        <span data-lucide={item.icon} className={`w-5 h-5 mr-3 ${item.active ? 'text-[#D2042D]' : 'text-gray-500'}`}></span>
                        <span className="flex-grow">{item.label}</span>
                        {!!item.count && (
                          <span className="ml-auto flex-none px-2 py-0.5 text-xs font-semibold bg-[#D2042D] text-white rounded-full">
                            {item.count}
                          </span>
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1 space-y-8">{children}</main>
        </div>
      </div>
      <footer className="mt-16 py-6 bg-white border-t border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {siteName} LLC. All Rights Reserved. |{' '}
          <a href="#" className="hover:text-[#D2042D]">Terms of Service</a> |{' '}
          <a href="#" className="hover:text-[#D2042D]">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
