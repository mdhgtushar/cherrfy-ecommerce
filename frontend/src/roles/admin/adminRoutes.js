import { Navigate } from "react-router-dom";
import ADMIN_PATHS from "./ADMIN_PATHS";
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import AdminLayout from "./adminLayout/AdminLayout";

// Pages
import Dashboard from "./site/Dashboard";
import About from "./site/About";
import AdminList from "./admin/AdminList";
import ProjectForm from "./site/ProjectForm";

// Product Pages
// import AliExpressViewer from "../products/AliExpressViewer";
// import AliExpressEdit from "../products/AliExpressEdit";
// import AliExpressProductForm from "../products/AliExpressProductForm";
// import ProductListPage from "../products/ProductListPage";
// import EditProduct from "../products/EditProduct";
import EditProduct from "./products/edit/EditProduct";
import ImportProductPage from "./products/import/ImportProductPage";

// Auth Pages
import LoginPage from "./auth/Login";
import Register from "./auth/Register";
import BackupRestorePage from "./backupRestore/BackupRestorePage";
import FileMediaManager from "./fileMedia/FileMediaManager";
import MarketingContentPage from "./marketingContent/MarketingContentPage";
import AliExpressApiSys from "./aliExpressIntegration/AliExpressApiSys";
import ProductManagement from "./products/ProductManagement";
import B2CManagement from "./B2CManagement/B2CManagement";
import D2CManagement from "./D2CManagement/D2CManagement";
import PricingAndProfitManagement from "./PricingAndProfitManagement/PricingAndProfitManagement";
import ProductLayout from "./adminLayout/product/ProductLayout";
import ProductListPage from "./products/list/ProductListPage";
import AliExpressAdd from "./products/create/AliExpressAdd";
import ChooseSource from "./products/ChooseSource";
import ManualCreatePage from "./products/create/ManualCreatePage";
import OrderManagementMenu from "./order/OrderManagementMenu";
import OrderLayout from "./adminLayout/order/OrderLayout";
import RoleLayout from "./adminLayout/role/RoleLayout";
import UserDashboard from "./workUpdate/UserDeshboard";
import UserList from "./users/UserList";
import DisputeManagement from "./dispute/DisputeManagement";
import Page404 from "../user/site/Page404";
import AllOrders from './order/AllOrders';
import OrderDetails from './order/OrderDetails';
import ManualOrder from './order/ManualOrder';
import AliExpressForwarding from './order/AliExpressForwarding';
import FailedOrders from './order/FailedOrders';
import Refunds from './order/Refunds';
import StatusLogs from './order/StatusLogs';
import UserLayout from './users/UserLayout';
import CreateUser from './users/CreateUser';
import UserDetails from './users/UserDetails';
import RolesPermissions from './users/RolesPermissions';
import AdminUsers from './admin/AdminUsers';
import SecuritySettings from './admin/SecuritySettings';
import ActivityLogs from './admin/ActivityLogs';
import CreateAdmin from './admin/CreateAdmin';
import CourierIntegrationLogs from "./shipping/CourierIntegrationLogs.jsx";
import CampaignsDiscounts from "./campaigns/CampaignsDiscounts";
import AnalyticsReports from "./analytics/AnalyticsReports";
import ProductViewPage from "./products/list/ProductViewPage";

export const adminRoutes = [
 
  {
    path: "/manage-admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "about", element: <About /> },
      { path: "workupdate", element: <UserDashboard /> },
      { path: "settings", element: <ProjectForm /> },
      {
        path: "admin",
        element: <RoleLayout />,
        children: [
          { path: "", element: <AdminList /> },
          { path: "users", element: <AdminUsers /> },
          { path: "roles", element: <RolesPermissions /> },
          { path: "security", element: <SecuritySettings /> },
          { path: "activity", element: <ActivityLogs /> },
          { path: "create", element: <CreateAdmin /> },
        ],
      },
      {
        path: "users",
        element: <UserLayout />,
        children: [
          { path: "", element: <UserList /> },
          { path: "create", element: <CreateUser /> },
          { path: "details", element: <UserDetails /> },
          { path: "roles", element: <RolesPermissions /> },
        ],
      },
      { path: "backup", element: <BackupRestorePage /> },
      { path: "media", element: <FileMediaManager /> },
      { path: "marketing", element: <MarketingContentPage /> },
      { path: "aliexpress", element: <AliExpressApiSys /> },
      { path: "b2c", element: <B2CManagement /> },
      { path: "d2c", element: <D2CManagement /> },
      { path: "pricing", element: <PricingAndProfitManagement /> },
      { path: "disputes", element: <DisputeManagement /> },
      {
        path: "products",
        element: <ProductLayout />,
        children: [
          { path: "", element: <ProductManagement /> },
          { path: "source", element: <ChooseSource /> },
          { path: "addProduct", element: <ManualCreatePage /> },
          { path: "addProduct/aliexpress", element: <AliExpressAdd /> },
          { path: "editProduct/:id", element: <EditProduct /> },
          { path: "view/:id", element: <ProductViewPage /> },
          { path: "import", element: <ImportProductPage /> },
        ],
      },
      {
        path: "orders",
        element: <OrderLayout />,
        children: [
          { path: "", element: <AllOrders /> },
          { path: "details", element: <OrderDetails /> },
          { path: "manual", element: <ManualOrder /> },
          { path: "aliexpress", element: <AliExpressForwarding /> },
          { path: "recovery", element: <FailedOrders /> },
          { path: "refunds", element: <Refunds /> },
          { path: "status-logs", element: <StatusLogs /> },
        ],
      },
      { path: "shipping", element: <CourierIntegrationLogs /> },
      { path: "campaigns", element: <CampaignsDiscounts /> },
      { path: "analytics", element: <AnalyticsReports /> },
      { path: "*", element: <Page404 /> },
    ],
  },
  {
    path: "/admin/auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate to="/admin/auth/login" /> },
    ],
  },
];
