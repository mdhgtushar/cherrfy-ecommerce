import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminManagementLayout = () => (
  <div>
    <AdminMenu />
    <Outlet />
  </div>
);

export default AdminManagementLayout; 