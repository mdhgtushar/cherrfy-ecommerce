// components/LoginModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userAuth/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { USER_PATHS } from "../routes/paths";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      toast.success("Login successful.");
      onClose(); // Close modal after successful login
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    const response = await dispatch(loginUser({ email, password }));
    if (response.error) {
      setError(response.error.message);
      toast.error(response.error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login to Your Account
          </h2>
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
            className="w-full px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
