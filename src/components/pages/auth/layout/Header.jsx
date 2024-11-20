import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex border-b-4 items-center px-5 mb-3">
      <h1 className="text-xl py-5 flex-1">Cherrfy Ecommerce Auth center</h1>
      <Link to="/" >Home</Link>
    </div>
  );
};

export default Header;
