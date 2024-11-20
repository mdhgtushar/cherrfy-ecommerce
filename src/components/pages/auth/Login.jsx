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
    <div className="border p-5">
      <h1 className="text-xl border-b-2 pb-2 mb-2">Login</h1>
      <form action="">
        <table>
          <tr className="">
            <td>
              <span>Email or phone </span>
            </td>
            <td>
              <input type="text" className="border" />
            </td>
          </tr>
          <tr>
            <td>
              <span>password </span>
            </td>
            <td>
              <input type="password" className="border" />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <input
                type="button"
                value="Login"
                className="border px-5 py-0 text-sm"
              />
            </td>
          </tr>
        </table>
      </form>   
    </div>
  );
};

export default Login;
