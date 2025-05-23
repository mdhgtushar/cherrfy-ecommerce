import { useDispatch } from "react-redux";
import ThemeSwitcher from "../../ThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../features/adminAuth/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { ADMIN_PATHS } from "../../routes/paths";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (response.error) {
      console.log("error", response.error);
      return toast.error(response.error.message);
    } else {
      toast.success("Logout successful.");
      setTimeout(() => {
        navigate(ADMIN_PATHS.AUTH.LOGIN);
      }, 1000);
    }
  };
  return (
    <header className="bg-white shadow px-4 py-3 w-full flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
        <ThemeSwitcher />
        <ToastContainer />
      </div>
    </header>
  );
};

export default Header;
