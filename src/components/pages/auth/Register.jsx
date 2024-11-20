import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="border p-5">
      <h1 className="text-xl border-b-2 pb-2 mb-2">Register</h1>

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
                value="Register"
                className="border px-5 py-0 text-sm"
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Register;
