import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileInfo } from "../../../features/userSettingsSlice";
import { Link } from "react-router-dom";
import USER_PATHS from "../USER_PATHS";

const UserOverview = () => {
  const { userProfile } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileInfo());
  }, [dispatch]);

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-10 px-4">
      {/* Profile Info */}
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="w-24 h-24 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-3xl font-bold">
          {userProfile?.name ? initials(userProfile.name) : "👤"}
        </div>

        {/* Name & Email */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {userProfile?.name || "Guest"}
          </h2>
          <p className="text-gray-500">{userProfile?.email || "Please login to see your info"}</p>
        </div>

        {/* Edit Profile Button */}
        <Link
          to={USER_PATHS.MANAGEPROFILE}
          className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition duration-200"
        >
          Edit Profile
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition duration-300">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-blue-700">{userProfile?.totalOrders || 0}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition duration-300">
          <p className="text-sm text-gray-500 mb-1">Pending Delivery</p>
          <p className="text-3xl font-bold text-yellow-500">—</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-md transition duration-300">
          <p className="text-sm text-gray-500 mb-1">Wishlist Items</p>
          <p className="text-3xl font-bold text-pink-500">—</p>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
