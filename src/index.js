import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; 
import reportWebVitals from "./reportWebVitals";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Auth from "./components/pages/auth/layout/Auth";
import ForgetPassword from "./components/pages/auth/ForgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MainPage from "./components/pages/MainPage";
import LoginReg from "./components/pages/auth/LoginReg";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />
      }
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginReg />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <ForgetPassword />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
