import React, { useState } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("account");

  const user = {
    name: "Hobayer Golondaj Tushar",
    email: "mdhgtushar@gmail.com",
    avatar: "https://ui-avatars.com/api/?name=Tushar",
    phone: "+8801302855453",
    address: "138, KBI Road, Gafargaon, Mymensingh",
    orders: 5,
    wishlist: 3,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="text-sm">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Address:</span> {user.address}</p>
          </div>
        );
      case "orders":
        return <div>You have {user.orders} orders.</div>;
      case "wishlist":
        return <div>You have {user.wishlist} items in wishlist.</div>;
      case "address":
        return (
          <div>
            <p><span className="font-semibold">Saved Address:</span></p>
            <p>{user.address}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4 h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow rounded-lg p-6 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-red-500"
        />
        <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b px-6 pt-4 pb-2 flex gap-4">
          {["account", "orders", "wishlist", "address"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize py-2 border-b-2 transition ${
                activeTab === tab
                  ? "border-red-500 text-red-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-red-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
