import React from 'react';
import { Outlet } from 'react-router-dom';
import UserMenu from './UserMenu';

const UserLayout = () => (
  <div>
    <UserMenu />
    <Outlet />
  </div>
);

export default UserLayout; 