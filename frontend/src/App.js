import { useSelector } from "react-redux";
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeSwitcher from "./ThemeSwitcher";
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

  return (
    <>
    
      <div className="bg-primary overflow-hidden">
        <Routes>
          {renderRoutes(userRoutes)}
          {renderRoutes(adminRoutes)}
        </Routes>
      </div>
      
    </>
  );
}

export default App;