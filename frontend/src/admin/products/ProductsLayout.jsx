import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProductsLayout = () => {
  return (
   <div>
     <div className="bg-gray-100 p-4 rounded-xl shadow-sm mb-6"> 
      <ul className="flex gap-4 text-sm font-medium text-blue-600">
        <li>
          <Link
            to="/productList"
            className="hover:underline hover:text-green-800 transition bg-red-700 text-white rounded-lg px-3 py-2 mr-2"
          >
            Products List
          </Link>
        </li>
        <li>
          <Link
            to="/addProduct"
            className="hover:underline hover:text-green-800 transition bg-red-700 text-white rounded-lg px-3 py-2 mr-2"
          >
            Create Product
          </Link>
        </li>
        <li>
          <Link
            to="/productViewer"
            className="hover:underline hover:text-green-800 transition bg-red-700 text-white rounded-lg px-3 py-2 mr-2"
          >
            Create Product from Ali
          </Link>
        </li>
        <li>
          <Link
            to="/productEditor"
            className="hover:underline hover:text-green-800 transition bg-red-700 text-white rounded-lg px-3 py-2 mr-2"
          >
            Create & Edit Product from Ali
          </Link>
        </li>
      </ul>
    </div>
    <Outlet />
   </div>
  );
};

export default ProductsLayout;
