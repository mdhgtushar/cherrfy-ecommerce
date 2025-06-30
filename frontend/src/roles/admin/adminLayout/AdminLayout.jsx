import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
import ADMIN_PATHS from "../ADMIN_PATHS"
import AdminHeader from './AdminHeader';

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (hidden on mobile) */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        <AdminHeader title="Dashboard" />
        <main className="flex-1 p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      {/* Mobile warning */}
      <div className="fixed inset-0 z-50 flex md:hidden items-center justify-center bg-white bg-opacity-95">
        <div className="p-6 w-full text-center font-semibold">
          <div className="flex items-center justify-center h-20 mb-3 border-b border-gray-200 bg-red-100 rounded border-2 border-red-200 shadow-sm">
            <h1 className="text-2xl font-bold text-red-500">Cherrfy</h1>
          </div>
          <h1 className="text-2xl text-red-500">
            Mobile View Not Available For Admin Panel Right Now
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
