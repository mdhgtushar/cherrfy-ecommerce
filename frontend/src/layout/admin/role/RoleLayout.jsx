import React from 'react'
import RoleMenu from './RoleMenu'
import { Outlet } from 'react-router-dom'

const RoleLayout = () => {
  return (
    <div>
        <RoleMenu />
        <Outlet />
    </div>
  )
}

export default RoleLayout