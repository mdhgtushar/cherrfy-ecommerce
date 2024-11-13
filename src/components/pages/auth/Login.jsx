import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    alert(email);
    alert(password);
  };
  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={submitForm}>
        <span>Email or phone </span>
        <input type="text" />
        <br />
        <br />
        <span>password </span>
        <input type="password" />
        <br />
        <br />
        <input type="button" value="Login" />
      </form><p>
        Forget Your password ? <Link to="/reset">Reset Now</Link>
      </p>
      <p>
        New user? <Link to="/register">Register Now</Link>
      </p>
    </>
  );
};

export default Login;
