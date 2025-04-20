import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser  } from "../features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datars = await dispatch(loginUser ({ email, password }));
    console.log(datars);
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Full Image */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="https://picsum.photos/1600/900"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
