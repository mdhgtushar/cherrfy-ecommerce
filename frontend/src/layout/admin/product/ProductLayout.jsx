import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ADMIN_PATHS } from '../../../routes/paths'

const ProductLayout = () => {
  return (
    <div>
        <header className="shadow px-4 py-3 bg-red-100 flex items-center justify-between m-5">
            <h1 className="text-xl font-bold text-gray-800">Product manager</h1>
            <div className="flex items-center gap-2">
              <Link to={ADMIN_PATHS.PRODUCTS.BASE} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                Product List
              </Link>
              <Link to={ADMIN_PATHS.PRODUCTS.SOURCE} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
              +  Create Product
              </Link>  
            </div>
          </header>
          <Outlet />
    </div>
  )
}

export default ProductLayout