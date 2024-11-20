import React from "react";
// import login_page_side from "../../../assets/img/login_page_side.jpg"
import { Outlet } from "react-router-dom";
import Header from "./Header";
const Auth = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-100vh">
        
      <Outlet />
      </div>
    </div>
  );
};

export default Auth;
