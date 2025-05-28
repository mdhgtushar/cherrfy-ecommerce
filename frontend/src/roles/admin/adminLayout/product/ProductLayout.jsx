import React from 'react'
import {  Outlet } from 'react-router-dom' 
import ProductMenu from './ProductMenu'

const ProductLayout = () => {
  return (
    <div>
       <ProductMenu />
          <Outlet />
    </div>
  )
}

export default ProductLayout