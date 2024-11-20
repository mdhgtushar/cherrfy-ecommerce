import React from "react";
import Login from "./Login";
import Register from "./Register";

const LoginReg = () => {
  return (
    <div className="flex">
      <div className="mr-5">
      <Login />
      </div>
      <Register />
    </div>
  );
};

export default LoginReg;
