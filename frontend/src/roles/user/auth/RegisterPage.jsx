import React, { useState } from "react";
// In a real application, you'd replace these with actual Redux/Firebase imports
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../../features/userAuthSlice";
// import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";
// import USER_PATHS from "../USER_PATHS";

// Mocking Redux and Toast for standalone example
const useDispatch = () => () => console.log("Dispatching action...");
const registerUser = async ({ username, email, password }) => {
  // Simulate API call success/failure
  if (email.includes("error")) {
    return { error: { message: "Registration failed. Please try again." }, payload: "Server Error" };
  }
  return { payload: "User registered successfully!" };
};
const toast = {
  error: (message) => console.error("Toast Error:", message),
  success: (message) => console.log("Toast Success:", message),
};
const ToastContainer = () => null; // Mock ToastContainer
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>; // Mock Link
const USER_PATHS = { LOGIN: "/login" }; // Mock path

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages on change to provide immediate feedback
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false); // Stop loading
      return;
    }

    // Basic client-side validation for empty fields
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await dispatch(
        registerUser({
          username: form.name,
          email: form.email,
          password: form.password,
        })
      );

      if (response.error) {
        setError(response.error.message || response.payload || "Registration failed.");
        toast.error(response.payload || "Registration failed.");
      } else {
        setSuccess("Registration successful! Redirecting to login...");
        toast.success("Registration successful!");
        // In a real app, you might redirect here:
        // navigate(USER_PATHS.LOGIN);
      }

      // Clear form only on success
      if (!response.error) {
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred during registration.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-[Inter]">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8"> {/* Shadow changed to md from xl */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2> {/* Text size and weight matched */}

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-sm border border-green-200">
            {success}
          </div>
        )}

        {/* Social Login Options - Styled to blend with new aesthetic */}
        <div className="space-y-4 mb-6">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 text-sm"> {/* Styling adjusted */}
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.54 11.928c0-.79-.06-1.56-.17-2.31h-10.4v4.47h6.05c-.27 1.46-1.05 2.7-2.28 3.55l-.01.01 3.5 2.72.06.05c2.14-1.97 3.37-4.8 3.37-8.22z" fill="#4285F4"></path>
              <path d="M12.14 22c3.24 0 5.96-1.07 7.95-2.9l-3.5-2.71c-.96.64-2.18 1.02-3.45 1.02-2.65 0-4.9-1.78-5.7-4.14l-.01-.01-3.66 2.84-.04.05c1.9 3.76 5.86 6.3 10.36 6.3z" fill="#34A853"></path>
              <path d="M6.43 13.91c-.24-.76-.38-1.57-.38-2.38s.14-1.62.38-2.38L2.73 6.39c-.83 1.63-1.3 3.49-1.3 5.37s.47 3.74 1.3 5.37l3.7-.01-.01-3.72z" fill="#FBBC05"></path>
              <path d="M12.14 5.61c1.88 0 3.51.64 4.8 1.87l3.1-3.1C17.92 1.48 15.2 0 12.14 0 7.64 0 3.68 2.54 1.78 6.3l3.66 2.84c.8-2.36 3.05-4.14 5.7-4.14z" fill="#EA4335"></path>
            </svg>
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 text-sm"> {/* Styling adjusted */}
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.01 3.657 9.123 8.438 9.879v-6.985H7.07V12h2.296V9.43c0-2.28 1.353-3.545 3.447-3.545 1.023 0 1.905.076 2.169.11V7.96h-1.297c-1.247 0-1.487.593-1.487 1.467V12h2.955l-.48 2.986h-2.475v6.985C18.343 21.123 22 17.01 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
            Sign up with Facebook
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 text-sm"> {/* Styling adjusted */}
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 2.2c-5.418 0-9.8 4.382-9.8 9.8s4.382 9.8 9.8 9.8 9.8-4.382 9.8-9.8-4.382-9.8-9.8-9.8zM16.99 15.684c-.035-.042-1.922-2.155-1.922-2.155s.174-1.954.174-2.883c0-1.02-.452-1.637-1.396-1.745-.632-.07-1.128.25-1.458.647-.282.34-.336.837-.09 1.22.28.452 2.054 2.658 2.054 2.658-.106 1.07-.464 1.777-.732 2.073-.668.74-1.57.842-2.19.805-.62-.038-1.016-.39-1.41-.65-.452-.294-.97-.47-1.472-.47-1.34 0-2.316.892-2.316 2.215 0 1.28.986 2.09 2.404 2.09 1.418 0 2.508-.946 2.924-2.36.035-.152.053-.306.053-.464 0-.152-.008-.29-.018-.426.088-.042.174-.084.26-.126.54-.252 1.34-.698 1.83-1.28.39-.462.59-1.06.59-1.666z"></path>
            </svg>
            Sign up with Apple
          </button>
        </div>

        <div className="relative flex items-center justify-center my-6"> {/* Margin adjusted */}
          <span className="absolute bg-white px-3 text-gray-500 text-sm">Or sign up with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 text-gray-700 placeholder-gray-400" // Text/placeholder color and focus ring adjusted
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 text-gray-700 placeholder-gray-400" // Text/placeholder color and focus ring adjusted
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 text-gray-700 placeholder-gray-400" // Text/placeholder color and focus ring adjusted
              placeholder="Password" // Placeholder text updated
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 text-gray-700 placeholder-gray-400" // Text/placeholder color and focus ring adjusted
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded text-white font-medium hover:opacity-90 transition duration-200
              ${isSubmitting
                ? "bg-blue-400 cursor-not-allowed" // Lighter blue for disabled
                : "bg-blue-600" // Primary blue for active button
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600"> {/* Margin adjusted, text color matched */}
          Already have an account?{" "}
          <Link to={USER_PATHS.LOGIN} className="text-blue-600 hover:underline font-medium"> {/* Blue color and underline matched */}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;