import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex border-b-4 items-center px-5 mb-2">
      <h1 className="text-xl py-5 flex-1">Cherrfy Ecommerce</h1>
      <ul className="inline-block p-0 m-0">
        <li className="inline-block py-2 border px-5 mr-2">Product find</li>
        <li className="inline-block py-2 border px-5 mr-2">Client info</li>
        <li className="inline-block py-2 border px-5 mr-2">Country select</li>
        <li className="inline-block py-2 border px-5 mr-2">Currency select</li>
        <li className="inline-block py-2 border px-5 mr-2">Order Manage</li>
      </ul>
      <Link to="/auth/login" className="py-2 border px-5">Auth</Link>
    </div>
  );
};

export default Header;
