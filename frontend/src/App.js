import { adminRoutes } from "./roles/admin/adminRoutes";
import { userRoutes } from "./roles/user/userRoutes";
import { vandorRoutes } from "./roles/vendor/vendorRoutes";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken as checkUserToken } from "./features/userAuthSlice";
import { checkToken as checkAdminToken } from "./features/adminAuthSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 
function App() { 
  const dispatch = useDispatch();

  // Check and restore tokens on app startup
  useEffect(() => {
    dispatch(checkUserToken());
    dispatch(checkAdminToken());
  }, [dispatch]);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route key={index} path={route.path} element={route.element} />
      );
    });

    // const user = useSelector((state) => state.userAuth.user); 
    // const admin = useSelector((state) => state.adminAuth.user); 
    

   

    return (
    <>
      <div className="bg-primary overflow-hidden">
        <Routes>
          {renderRoutes(userRoutes)}
          {renderRoutes(adminRoutes)}
          {renderRoutes(vandorRoutes)}
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* {user && admin && (
        <div className="fixed bottom-0 right-0 p-4 border m-2">
          <h1 className="text-2xl font-bold">Admin and User both logged in</h1>
          <p className="text-lg">Please logout one of them</p>
          <p>User Email: {user.email}</p>
          <p>Admin Email: {admin.email}</p>
          </div>
        )} */}
    </>
  );
}

export default App;