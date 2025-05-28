import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../features/adminAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import ADMIN_PATHS from "../ADMIN_PATHS";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.adminAuth);
const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(loginUser({ email, password }));
        if(data.error) {
            console.log("error", data.error);
            toast.error(data.error.message);
           
        }else{
            toast.success("Login successful.");
             setTimeout(() => {
                navigate(ADMIN_PATHS.DASHBOARD);
            }, 1000);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex">
            <ToastContainer />
            {/* Left: Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                    {error}
                    <form className="space-y-5" onSubmit={handleSubmit}>
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
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer " style={{ cursor: "Pointer" }}
                        >
                            Log In
                        </button>
                    </form>
                    {/* <p className="text-sm text-gray-500 text-center mt-4">
                        Don’t have an account?{' '}
                        <Link to="/auth/register" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p> */}
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
