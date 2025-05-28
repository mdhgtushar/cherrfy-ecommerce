import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
import ADMIN_PATHS from "../ADMIN_PATHS"

const AdminLayout = () => {
  const { user } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      //redirect to login
      navigate(ADMIN_PATHS.AUTH.LOGIN);
    }
  }, []);
  return (
    <>
      <div className="flex hidden md:block">
        <Sidebar />
        <div className="flex-1 ml-64 min-h-screen">
          <Header />
          <main className="p-0">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="flex md:hidden items-center justify-center h-screen">
        <div className="p-6 w-full text-center font-semibold">
          <div className="flex items-center justify-center h-20 mb-3 border-b border-gray-200 bg-red-100 rounded border-2 border-red-200 shadow-sm">
            <h1 className="text-2xl font-bold text-red-500">Cherrfy</h1>
          </div>
          <h1 className="text-2xl text-red-500">
            Mobile View Not Available For Admin Panel Right Now
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
