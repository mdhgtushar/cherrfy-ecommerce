import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileInfo } from "../../../features/userAuthSlice";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { userProfile, status } = useSelector((state) => state.userSettings);
  const userAuth = useSelector((state) => state.userAuth);
 
  return (
    <div activeKey="account-settings" pageTitle="Account Settings">
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
          Profile & Account Settings
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                value={userAuth.user.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                value={userAuth.user.email}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                  placeholder="+8801XXXXXXXXX"
                  value={userAuth.user.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm"
                  defaultValue={userAuth.user.settings?.language}
                >
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-[#D2042D] hover:bg-[#FA0F3E] text-white font-medium py-2 px-5 rounded text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="bg-white border border-[#E0E0E0] rounded">
          <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
            Change Password
          </div>
          <div className="p-6">
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full border border-[#E0E0E0] rounded px-3 py-2"
                />
              </div>
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white border border-[#E0E0E0] rounded">
          <div className="border-b border-[#E0E0E0] p-4 font-semibold text-[#333333]">
            Communication Preferences
          </div>
          <div className="p-6">
            <form className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />{" "}
                Email updates
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> SMS notifications
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />{" "}
                Promotional offers
              </label>
              <div className="pt-2">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded text-sm"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mt-6">
        <div className="border-b border-[#E0E0E0] p-4 font-semibold text-red-600">
          Danger Zone
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600">
            Delete your account and all associated data. This action cannot be
            undone.
          </p>
          <button
            type="button"
            className="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
