import React, { useEffect, useState } from "react";
// IMPORTANT: Uncomment these actual imports when integrating this component into your full Cherrify project
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/userAuthSlice"; // Your actual loginUser action
import { toast, ToastContainer } from "react-toastify"; // Your actual Toastify imports
import { Link, useNavigate } from "react-router-dom"; // Your actual React Router imports
import USER_PATHS from "../USER_PATHS"; // Your actual USER_PATHS

// Mocks for demonstration in the Canvas environment.
// REMOVE or comment out these mock definitions when using your actual Redux store, Router, etc.
// const useDispatch = () => () => console.log("Dispatching action (mock)...");
// const useSelector = (selector) => {
//   // Mock user state: change 'null' to a mock user object like { id: '123', email: 'test@example.com' } to test redirection
//   return selector({ userAuth: { user: null } });
// };
// const loginUser = async ({ email, password }) => {
//   console.log(Mock Login Attempt: Email/Identifier - ${email}, Password - ${password});
//   // Simulate API call success/failure for demonstration
//   if (email === "error@example.com" || password === "wrong") {
//     return { error: { message: "Invalid credentials (mock)." }, payload: "Login failed (mock)." };
//   }
//   return { payload: { user: { email: email, name: "Test User" }, token: "mock_token_123" } };
// };
// const toast = {
//   error: (message) => console.error("Toast Error (mock):", message),
//   success: (message) => console.log("Toast Success (mock):", message),
// };
// const ToastContainer = () => null; // Mock ToastContainer component
// const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>; // Mock Link component
// const useNavigate = () => (path) => console.log("Navigating (mock) to:", path); // Mock useNavigate hook
// const USER_PATHS = { HOME: "/", REGISTER: "/register" }; // Mock paths

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  // Using separate states for email (which will act as identifier) and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Manages loading state for the submit button

  // Effect to handle redirection after user logs in successfully
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(USER_PATHS.HOME); // Redirects to the home page after a short delay
      }, 1000);
    }
  }, [user, navigate]); // Dependencies: reruns if 'user' or 'navigate' changes

  // Handles input changes for email and password fields
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error message on input change
    setSuccess(""); // Clear success message on input change
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error message on input change
    setSuccess(""); // Clear success message on input change
  };

  // Handles the form submission for email/password login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior (page reload)
    setIsSubmitting(true); // Set loading state to true

    // Client-side validation: check if email and password fields are not empty
    if (!email.trim() || !password.trim()) {
      setError("Email/Username/Phone Number and Password are required.");
      setIsSubmitting(false); // Stop loading if validation fails
      return;
    }

    setError(""); // Clear any previous error messages
    setSuccess(""); // Clear any previous success messages

    try {
      // Dispatch the loginUser action with the email (acting as identifier) and password
      const response = await dispatch(loginUser({ email: email, password: password }));

      // Handle the response from the loginUser action
      if (response.error) {
        // If there's an error, set the error state and show a toast notification
        setError(response.error.message || "Login failed. Please check your credentials.");
        toast.error(response.error.message || "Login failed.");
      } else {
        // If login is successful, set the success state and show a toast notification
        setSuccess("Login successful!");
        toast.success("Login successful.");
        // Note: Redirection is handled by the useEffect hook watching the 'user' state
        // Clear form fields on successful login (optional, based on UX preference)
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      // Catch any unexpected errors during the asynchronous operation
      setError("An unexpected error occurred during login.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // Always stop loading, regardless of success or failure
    }
  };

  // Placeholder function for social login buttons
  const handleSocialLogin = (provider) => {
    console.log(`Attempting social login with ${provider}`);
    // In a real application, this would trigger Firebase or OAuth login flow (e.g., popup/redirect)
    setError(""); // Clear any previous errors before starting social login
    setSuccess(`Redirecting to ${provider} login...`);
    setIsSubmitting(true); // Indicate loading for social login
    // Simulate a delay for social login for demonstration purposes
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(""); // Clear message after delay
      // After actual social login, your auth system would handle user state updates and redirection
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-[Inter]">
      <ToastContainer /> {/* Toast notification container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10 transform transition-all duration-300 hover:scale-[1.005]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Welcome Back!</h2>

        {/* Display Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 text-sm border border-red-200 animate-fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 text-sm border border-green-200 animate-fade-in">
            {success}
          </div>
        )}

        {/* Social Login Options */}
        <div className="space-y-4 mb-6">
          <button
            type="button" // Important: set type="button" to prevent accidental form submission
            onClick={() => handleSocialLogin("Google")}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isSubmitting} // Disable social buttons when main form is submitting
          >
            {/* Google SVG Icon */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.54 11.928c0-.79-.06-1.56-.17-2.31h-10.4v4.47h6.05c-.27 1.46-1.05 2.7-2.28 3.55l-.01.01 3.5 2.72.06.05c2.14-1.97 3.37-4.8 3.37-8.22z" fill="#4285F4"></path>
              <path d="M12.14 22c3.24 0 5.96-1.07 7.95-2.9l-3.5-2.71c-.96.64-2.18 1.02-3.45 1.02-2.65 0-4.9-1.78-5.7-4.14l-.01-.01-3.66 2.84-.04.05c1.9 3.76 5.86 6.3 10.36 6.3z" fill="#34A853"></path>
              <path d="M6.43 13.91c-.24-.76-.38-1.57-.38-2.38s.14-1.62.38-2.38L2.73 6.39c-.83 1.63-1.3 3.49-1.3 5.37s.47 3.74 1.3 5.37l3.7-.01-.01-3.72z" fill="#FBBC05"></path>
              <path d="M12.14 5.61c1.88 0 3.51.64 4.8 1.87l3.1-3.1C17.92 1.48 15.2 0 12.14 0 7.64 0 3.68 2.54 1.78 6.3l3.66 2.84c.8-2.36 3.05-4.14 5.7-4.14z" fill="#EA4335"></path>
            </svg>
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {/* Facebook SVG Icon */}
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.01 3.657 9.123 8.438 9.879v-6.985H7.07V12h2.296V9.43c0-2.28 1.353-3.545 3.447-3.545 1.023 0 1.905.076 2.169.11V7.96h-1.297c-1.247 0-1.487.593-1.487 1.467V12h2.955l-.48 2.986h-2.475v6.985C18.343 21.123 22 17.01 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
            Sign in with Facebook
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Apple")}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {/* Apple SVG Icon */}
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 2.2c-5.418 0-9.8 4.382-9.8 9.8s4.382 9.8 9.8 9.8 9.8-4.382 9.8-9.8-4.382-9.8-9.8-9.8zM16.99 15.684c-.035-.042-1.922-2.155-1.922-2.155s.174-1.954.174-2.883c0-1.02-.452-1.637-1.396-1.745-.632-.07-1.128.25-1.458.647-.282.34-.336.837-.09 1.22.28.452 2.054 2.658 2.054 2.658-.106 1.07-.464 1.777-.732 2.073-.668.74-1.57.842-2.19.805-.62-.038-1.016-.39-1.41-.65-.452-.294-.97-.47-1.472-.47-1.34 0-2.316.892-2.316 2.215 0 1.28.986 2.09 2.404 2.09 1.418 0 2.508-.946 2.924-2.36.035-.152.053-.306.053-.464 0-.152-.008-.29-.018-.426.088-.042.174-.084.26-.126.54-.252 1.34-.698 1.83-1.28.39-.462.59-1.06.59-1.666z"></path>
            </svg>
            Sign in with Apple
          </button>
        </div>

        <div className="relative flex items-center justify-center my-6">
          <span className="absolute bg-white px-3 text-gray-500 text-sm">Or sign in with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-700">
              Email Address / Username / Phone Number
            </label>
            <input
              id="email" // ID remains 'email' for compatibility
              type="text" // Changed type to 'text' to allow username/phone number input
              name="email" // Name remains 'email' to match your state variable
              value={email}
              onChange={handleChangeEmail} // Specific handler for email/identifier
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400 text-base"
              placeholder="Enter your email, username, or phone number" // Updated placeholder
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword} // Specific handler for password
              required
              minLength={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out text-gray-800 placeholder-gray-400 text-base"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out
              ${isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={USER_PATHS.REGISTER} className="text-blue-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;