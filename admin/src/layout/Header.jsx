import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout());
    };
    return (
      <header className="bg-white shadow px-4 py-3 w-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
            Logout
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;
  