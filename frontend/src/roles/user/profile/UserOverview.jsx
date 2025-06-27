import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileInfo } from "../../../features/userSettingsSlice";
import { Link } from "react-router-dom";
import USER_PATHS from "../USER_PATHS";

const UserOverview = () => {
  const { userProfile, status } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(userProfileInfo());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Info */}
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-4" />
        <h2 className="text-xl font-semibold">
          {userProfile?.name || "Guest"}
        </h2>
        <p className="text-gray-600">{userProfile?.email || "please login"}</p>
        <Link
          to={USER_PATHS.MANAGEPROFILE}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{userProfile?.totalOrders || 0}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Pending Delivery</p>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500">Wishlist Items</p>
          <p className="text-2xl font-bold">-</p>
        </div>
      </div>

      

  
    </div>
  );
};

export default UserOverview;
