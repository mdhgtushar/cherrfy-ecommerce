// src/pages/user/Login.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/userAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import USER_PATHS from "../USER_PATHS";
import GoogleButton from "./GoogleButton";
import FbLoginButton from "./FbLoginButton";
import logo from "../../../assets/images/cherrfy-logo.png"

export default function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect when user already logged in
  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate(USER_PATHS.HOME);
      }, 1000);
    }
  }, [user, navigate]);

  const validate = () => {
    const ok = identifier.trim().length >= 3 && password.trim().length >= 6;
    setError(
      ok ? "" : "Please enter a valid identifier (min 3 chars) and password (min 6 chars)."
    );
    return ok;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await dispatch(loginUser({ email: identifier, password }));
      if (response.error) {
        setError(response.error.message || "Login failed. Please check your credentials.");
        toast.error(response.error.message || "Login failed.");
      } else {
        toast.success("Login successful!");
        setIdentifier("");
        setPassword("");
      }
    } catch (err) {
      setError("An unexpected error occurred during login.");
      toast.error("Unexpected error during login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social logins
  const handleSocialLogin = (provider) => {
    toast.info(`Redirecting to ${provider} login...`);
  };

  return (
    <div className="min-h-80vh antialiased text-gray-800 flex flex-col items-center">
      <ToastContainer />
      <div className="flex-grow flex flex-col justify-center w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-10 text-center">
        <Link to="/" className="text-3xl font-extrabold text-[#D2042D] tracking-tight">CHERRFY</Link>
          <p className="text-base text-gray-500 mt-2">
            Welcome back! Please sign in to access your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full max-w-5xl mx-auto">
          {/* ==== Login Form ==== */}
          <section className="lg:col-span-3 bg-white border border-[#E0E0E0] rounded-lg shadow-md max-w-md mx-auto lg:max-w-none w-full">
            <div className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#333333] text-center">Sign In</h2>

              <form className="space-y-4" onSubmit={onSubmit}>
                {error && (
                  <p className="p-3 text-sm text-red-700 bg-red-50 border border-red-300 rounded-lg">
                    {error}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email / Phone / Username
                  </label>
                  <input
                    className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]"
                    placeholder="Email, phone or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      className="mt-1 w-full border border-[#E0E0E0] rounded-lg px-4 py-2.5 pr-10 text-base focus:outline-none focus:border-[#D2042D] focus:ring-1 focus:ring-[#D2042D]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPass((s) => !s)}
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-[#E0E0E0] text-[#D2042D] focus:ring-[#D2042D]"
                    />{" "}
                    Remember me
                  </label>
                  <Link
                    to={USER_PATHS.FORGOT_PASSWORD || "#"}
                    className="text-sm font-medium text-[#D2042D] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? "bg-[#e45c72] cursor-not-allowed"
                      : "bg-[#D2042D] hover:bg-[#FA0F3E]"
                  } text-white font-bold py-3 px-5 rounded-lg text-lg transition-colors duration-150 shadow-lg mt-6`}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>

                <p className="text-sm text-gray-500 text-center pt-2">
                  Don’t have an account?{" "}
                  <Link
                    to={USER_PATHS.REGISTER}
                    className="text-[#D2042D] hover:underline font-medium"
                  >
                    Create one instantly
                  </Link>
                  .
                </p>
              </form>
            </div>
          </section>

          {/* ==== Social Login Section ==== */}
          <aside className="lg:col-span-2 bg-white border border-[#E0E0E0] rounded-lg p-8 h-fit">
            <div className="text-xl font-bold text-[#333333] mb-4 pb-4 border-b border-[#E0E0E0]">
              Sign in with a provider
            </div>

            <div className="space-y-3">
              <GoogleButton />
              <FbLoginButton />

              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-full inline-flex items-center justify-center gap-3 rounded-lg text-base bg-white border border-[#E0E0E0] py-3 hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="w-5 h-5">G</span>
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full inline-flex items-center justify-center gap-3 rounded-lg text-base bg-white border border-[#E0E0E0] py-3 hover:border-gray-300 hover:bg-gray-50"
              >
                <span className="w-5 h-5">f</span>
                Continue with Facebook
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#D2042D] hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#D2042D] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
 
    </div>
  );
}
