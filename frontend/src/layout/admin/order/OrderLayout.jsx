
import React from 'react'
import { Outlet } from 'react-router-dom'
import OrderMenu from './OrderMenu'

const OrderLayout = () => {
  return (
    <div>
       <OrderMenu />
        <Outlet />
    </div>
  )
}

export default OrderLayout