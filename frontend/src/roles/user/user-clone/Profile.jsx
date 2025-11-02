import React from 'react';
import SharedLayout from './SharedLayout.jsx';

export default function Profile(){
  const ordersInTransit = 1;
  const availableVouchers = 3;
  const unreadNotifications = 5;
  const user = { name: 'Al Sadman Awal', email: 'sadmanawal333@gmail.com', tier: 'Gold Member' };

  const recommendations = [
    { title: 'Hiphop Cross Necklace', price: '$15.99', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Necklace', link: '#', rating: 4.5 },
    { title: 'Wireless Bluetooth Earbuds', price: '$89.00', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Earbuds', link: '#', rating: 4.2 },
    { title: 'Designer Sunglasses', price: '$29.99', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Glasses', link: '#', rating: 3.9 },
    { title: 'Professional Hair Trimmer Set', price: '$49.50', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Trimmer', link: '#', rating: 4.8 },
    { title: 'Luxury Silver Bracelet', price: '$12.00', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Bracelet', link: '#', rating: 4.1 },
    { title: 'Magnetic Phone Case', price: '$19.99', image_url: 'https://via.placeholder.com/150/e0e0e0/333333?text=Phone+Case', link: '#', rating: 4.6 },
  ];

  return (
    <SharedLayout activeKey="dashboard" pageTitle="Account Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <a href="orders.php" className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition">
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">Orders In Transit</p>
          <p className="text-4xl font-bold text-[#333333] mt-2">{ordersInTransit}</p>
          <p className="text-sm text-blue-600 font-medium mt-3">Track Shipment →</p>
        </a>
        <a href="vouchers.php" className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition">
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">Available Vouchers</p>
          <p className="text-4xl font-bold text-[#333333] mt-2">{availableVouchers}</p>
          <p className="text-sm text-green-600 font-medium mt-3">Redeem Now →</p>
        </a>
        <a href="#notifications" className="bg-white border border-[#E0E0E0] p-6 rounded hover:shadow-sm transition">
          <p className="text-sm font-medium text-gray-600 mb-1 flex items-center">Unread Notifications</p>
          <p className="text-4xl font-bold text-[#333333] mt-2">{unreadNotifications}</p>
          <p className="text-sm text-orange-600 font-medium mt-3">Go to Inbox →</p>
        </a>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Profile & Account Settings</div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#F8F8F8] p-4 border border-[#E0E0E0] rounded">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 flex-none flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold mr-4">
                AA
              </div>
              <div>
                <p className="text-lg font-semibold text-[#333333]">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="px-2 py-0.5 mt-1 inline-block text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  {user.tier}
                </span>
              </div>
            </div>
            <a href="account-settings.php" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm">Edit Profile</a>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Latest Shipment Update</div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F8F8F8] p-4 border border-[#E0E0E0] rounded">
            <div className="mb-3 sm:mb-0">
              <p className="text-lg font-semibold text-[#333333]">Order #17345</p>
              <p className="text-sm text-gray-600 mt-1">Status: <span className="font-bold text-green-600">Out for Delivery</span></p>
              <p className="text-sm text-gray-600">ETA: <span className="font-bold text-[#333333]">Oct 23rd</span></p>
            </div>
            <a href="#" className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm">Track Live</a>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">Recommended For You</div>
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recommendations.map((p, idx) => (
              <a key={idx} href={p.link} className="group block bg-white border border-[#E0E0E0] rounded hover:shadow-md transition">
                <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={p.image_url} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-[#333333] leading-snug group-hover:text-[#D2042D] transition-colors line-clamp-2">{p.title}</h4>
                  <p className="text-lg font-bold text-[#D2042D] mt-1">{p.price}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="mr-1">★</span>
                    <span>{p.rating}</span>
                    <span className="ml-auto text-gray-400"> (128 reviews)</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
