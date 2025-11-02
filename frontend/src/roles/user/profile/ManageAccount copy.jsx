import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileInfo } from "../../../features/userSettingsSlice";
import API from "../../../util/API";
import { toast, ToastContainer } from "react-toastify";

const ManageAccountPage = () => {
  const dispatch = useDispatch();
  // Initial States
  const { userProfile, status } = useSelector((state) => state.userSettings);
  const [profile, setProfile] = useState({
    username: userProfile?.username || "",
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
  });
  useEffect(() => {
    dispatch(userProfileInfo());
  }, []);
  useEffect(() => {
    if (userProfile) {
      setProfile({
        username: userProfile.username || "",
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });
    }
  }, [userProfile]);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [billing, setBilling] = useState({
    address: "138, KBI Road, Gafargaon, Mymensingh",
  });

  const [shippingList, setShippingList] = useState([
    { id: 1, address: "House #1, Dhaka" },
    { id: 2, address: "Village #2, Mymensingh" },
  ]);

  const [newShipping, setNewShipping] = useState("");
  const [editingShippingId, setEditingShippingId] = useState(null);
  const [editingShippingText, setEditingShippingText] = useState("");

  // Handlers
  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordInputChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await API.put("/user/password", {
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      
      if (response.data.success) {
        toast.success("Password updated successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const handleBillingChange = (e) =>
    setBilling({ ...billing, address: e.target.value });

  const handleAddShipping = () => {
    if (newShipping.trim() !== "") {
      setShippingList([
        ...shippingList,
        { id: Date.now(), address: newShipping },
      ]);
      setNewShipping("");
    }
  };

  const handleEditShipping = (id) => {
    const item = shippingList.find((s) => s.id === id);
    setEditingShippingId(id);
    setEditingShippingText(item.address);
  };

  const handleUpdateShipping = () => {
    setShippingList(
      shippingList.map((s) =>
        s.id === editingShippingId ? { ...s, address: editingShippingText } : s
      )
    );
    setEditingShippingId(null);
    setEditingShippingText("");
  };

  const handleDeleteShipping = (id) => {
    setShippingList(shippingList.filter((s) => s.id !== id));
  };

  const handleSaveChanges = async () => { 
    try {
      console.log('Updating profile with data:', profile);
      const response = await API.put("/user/profile", profile);
      console.log('Profile update response:', response);
      
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        // Refresh the profile data
        dispatch(userProfileInfo());
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-semibold">Manage Account</h1>
<ToastContainer />
      {/* Profile Info */}
      <section>
        <h2 className="text-xl font-medium mb-2">Edit Profile Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            value={profile?.username}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Username"
          />
          <input
            type="text"
            name="firstName"
            value={profile?.firstName}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={profile?.lastName}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={profile?.email}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={profile?.phone}
            onChange={handleProfileChange}
            className="border p-2 rounded"
            placeholder="Phone Number"
          />
        </div>
      </section>

      {/* Billing Address */}
      <section>
        <h2 className="text-xl font-medium mb-2">Billing Address</h2>
        <textarea
          value={profile?.address}
            name="address"
          onChange={handleProfileChange}
          rows="3"
          className="w-full border rounded p-2"
        ></textarea>
      </section>

      {/* Shipping Addresses */}
      {false && (
      <section>
        <h2 className="text-xl font-medium mb-2">Shipping Addresses</h2>
        <div className="space-y-4">
          {shippingList.map((shipping) => (
            <div key={shipping.id} className="flex items-center gap-2">
              {editingShippingId === shipping.id ? (
                <>
                  <input
                    type="text"
                    value={editingShippingText}
                    onChange={(e) => setEditingShippingText(e.target.value)}
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    onClick={handleUpdateShipping}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingShippingId(null);
                      setEditingShippingText("");
                    }}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 p-2 bg-gray-100 rounded">
                    {shipping.address}
                  </span>
                  <button
                    onClick={() => handleEditShipping(shipping.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteShipping(shipping.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newShipping}
              onChange={(e) => setNewShipping(e.target.value)}
              placeholder="Add new shipping address"
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={handleAddShipping}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </section>
      )}

      {/* Save Changes */}
      <div>
        <button
          onClick={handleSaveChanges}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Save All Changes
        </button>
      </div>
      {/* Password Change */}
      <section>
        <h2 className="text-xl font-medium mb-2">Change Password</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handlePasswordInputChange}
            className="border p-2 rounded"
            placeholder="Current Password"
          />
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handlePasswordInputChange}
            className="border p-2 rounded"
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handlePasswordInputChange}
            className="border p-2 rounded"
            placeholder="Confirm Password"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handlePasswordChange}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Change Password
          </button>
        </div>
      </section>
    </div>
  );
};

export default ManageAccountPage;
