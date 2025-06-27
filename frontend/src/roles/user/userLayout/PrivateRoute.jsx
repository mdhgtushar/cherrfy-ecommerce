// components/PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.userAuth.user);
  const token = localStorage.getItem("userToken");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
