import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const styele = { 
        // background:" url('https://e0.pxfuel.com/wallpapers/142/893/desktop-wallpaper-lottery-background.jpg')",
        background: "blue",
        backgroundRepeat:"no-repeat",
        backgroundSize: "cover",
        overflow: "hidden"
      }
      const submitForm = (e) => {
        e.preventDefault();
        alert(email)
        alert(password)
      } 
  return (
    <>
    <h1>Reset Your password</h1>
    <form action="">
      <span>Email or phone </span>
      <input type="text" />
      <br />
      <br /> 
      <input type="button" value="Check Now" />
    </form>
    <p>
      Already user? <Link to="/">Login Now</Link>
    </p>
  </> 
  );
};

export default ForgetPassword;
