import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL query
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch user info
      axios.get("http://localhost:5000/api/me")
        .then((res) => {
          dispatch(setUser(res.data.user));
          navigate("/");
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div className="text-center mt-10">Logging you in with Facebook...</div>;
};

export default AuthSuccess;
