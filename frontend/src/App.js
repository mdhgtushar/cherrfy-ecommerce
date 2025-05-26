import { useSelector } from "react-redux";
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeSwitcher from "./ThemeSwitcher";
import { vandorRoutes } from "./routes/vandorRoutes";
// ...other imports

function App() { 

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

    const user = useSelector((state) => state.userAuth.user); 
    const admin = useSelector((state) => state.adminAuth.user); 
    

   

  return (
    <>
    
      <div className="bg-primary overflow-hidden">
        <Routes>
          {renderRoutes(userRoutes)}
          {renderRoutes(adminRoutes)}
          {renderRoutes(vandorRoutes)}
        </Routes>
      </div>
      {user && admin && (
        <div className="fixed bottom-0 right-0 p-4 border m-2">
          <h1 className="text-2xl font-bold">Admin and User both logged in</h1>
          <p className="text-lg">Please logout one of them</p>
          <p>User Email: {user.email}</p>
          <p>Admin Email: {admin.email}</p>
        </div>
      )}
    </>
  );
}

export default App;