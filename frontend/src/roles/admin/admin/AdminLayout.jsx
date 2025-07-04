import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminLayout = () => (
  <div>
    <AdminMenu />
    <Outlet />
  </div>
);

export default AdminLayout; 