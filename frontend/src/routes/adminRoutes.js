import { Navigate } from "react-router-dom";
import { ADMIN_PATHS } from "./paths";

// Layouts
import AdminLayout from "../layout/admin/AdminLayout";

// Pages
import Dashboard from "../admin/site/Dashboard";
import About from "../admin/site/About";
import AdminList from "../admin/admin/AdminList";
import ProjectForm from "../admin/site/ProjectForm";

// Product Pages
// import AliExpressViewer from "../admin/products/AliExpressViewer";
// import AliExpressEdit from "../admin/products/AliExpressEdit";
// import AliExpressProductForm from "../admin/products/AliExpressProductForm";
// import ProductListPage from "../admin/products/ProductListPage";
// import EditProduct from "../admin/products/EditProduct";

// Auth Pages
import LoginPage from "../admin/auth/Login";
import Register from "../admin/auth/Register";
import BackupRestorePage from "../admin/backupRestore/BackupRestorePage";
import FileMediaManager from "../admin/fileMedia/FileMediaManager";
import MarketingContentPage from "../admin/marketingContent/MarketingContentPage";
import AliExpressApiSys from "../admin/aliExpressIntegration/AliExpressApiSys";
import ProductManagement from "../admin/products/ProductManagement";
import B2CManagement from "../admin/B2CManagement/B2CManagement";
import D2CManagement from "../admin/D2CManagement/D2CManagement";
import PricingAndProfitManagement from "../admin/PricingAndProfitManagement/PricingAndProfitManagement";
import ProductLayout from "../layout/admin/product/ProductLayout";
import ProductListPage from "../admin/products/list/ProductListPage";
import AliExpressAdd from "../admin/products/create/AliExpressAdd";
import ChooseSource from "../admin/products/ChooseSource";
import ManualCreatePage from "../admin/products/create/ManualCreatePage";
import OrderManagementMenu from "../admin/order/OrderManagementMenu";
import OrderLayout from "../layout/admin/order/OrderLayout";
import RoleLayout from "../layout/admin/role/RoleLayout";
import UserDashboard from "../admin/workUpdate/UserDeshboard";
import UserList from "../admin/users/UserList";
import Page404 from "../user/Page404";

export const adminRoutes = [
  {
    path: ADMIN_PATHS.BASE, // "/manage-admin"
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // Default dashboard
      { path: ADMIN_PATHS.DASHBOARD.replace(ADMIN_PATHS.BASE + '/', ''), element: <Dashboard /> }, // Only "dashboard"
      { path: ADMIN_PATHS.ABOUT.replace(ADMIN_PATHS.BASE + '/', ''), element: <About /> },
      { path: ADMIN_PATHS.WORKUPDATE.replace(ADMIN_PATHS.BASE + '/', ''), element: <UserDashboard /> },
      { path: ADMIN_PATHS.SETTINGS.replace(ADMIN_PATHS.BASE + '/', ''), element: <ProjectForm /> },
      {
        path: ADMIN_PATHS.ADMIN.BASE.replace(ADMIN_PATHS.BASE + '/', ''),
        element: <RoleLayout />,
        children: [
          { path: ADMIN_PATHS.ADMIN.BASE.replace(ADMIN_PATHS.ADMIN.BASE + '/', ''), element: <AdminList /> },
          { path: ADMIN_PATHS.ADMIN.LIST.replace(ADMIN_PATHS.ADMIN.BASE + '/', ''), element: <AdminList /> },
        ]
      },
      { path: ADMIN_PATHS.USERS.replace(ADMIN_PATHS.BASE + '/', ''), element: <UserList /> },
      { path: ADMIN_PATHS.BACKUP.replace(ADMIN_PATHS.BASE + '/', ''), element: <BackupRestorePage /> },
      { path: ADMIN_PATHS.MEDIA.replace(ADMIN_PATHS.BASE + '/', ''), element: <FileMediaManager /> },
      { path: ADMIN_PATHS.MARKETING.replace(ADMIN_PATHS.BASE + '/', ''), element: <MarketingContentPage /> },
      { path: ADMIN_PATHS.ALIEXPRESS.replace(ADMIN_PATHS.BASE + '/', ''), element: <AliExpressApiSys /> },
      { path: ADMIN_PATHS.B2C.replace(ADMIN_PATHS.BASE + '/', ''), element: <B2CManagement /> },
      { path: ADMIN_PATHS.D2C.replace(ADMIN_PATHS.BASE + '/', ''), element: <D2CManagement /> },
      { path: ADMIN_PATHS.PRICING.replace(ADMIN_PATHS.BASE + '/', ''), element: <PricingAndProfitManagement /> },
      {
        path: ADMIN_PATHS.PRODUCTS.BASE.replace(ADMIN_PATHS.BASE + '/', ''),
        element: <ProductLayout />,
        children: [
          { path: ADMIN_PATHS.PRODUCTS.BASE.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <ProductManagement /> },
          // { path: ADMIN_PATHS.PRODUCTS.VIEWER.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <AliExpressViewer /> },
          // { path: ADMIN_PATHS.PRODUCTS.EDITOR.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <AliExpressEdit /> },
          { path: ADMIN_PATHS.PRODUCTS.SOURCE.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <ChooseSource /> },
          { path: ADMIN_PATHS.PRODUCTS.ADD.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <ManualCreatePage /> },
          { path: ADMIN_PATHS.PRODUCTS.ALIEXPRESS.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <AliExpressAdd /> },
          { path: ADMIN_PATHS.PRODUCTS.LIST.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <ProductListPage /> },
          // { path: ADMIN_PATHS.PRODUCTS.EDIT.replace(ADMIN_PATHS.PRODUCTS.BASE + '/', ''), element: <EditProduct /> },
        ],
      },
      {
        path: ADMIN_PATHS.ORDERS.replace(ADMIN_PATHS.BASE + '/', ''),
        element: <OrderLayout />,
        children: [
          { path: ADMIN_PATHS.ORDERS.replace(ADMIN_PATHS.ORDERS + '/', ''), element: <OrderManagementMenu /> },
        ],
      },
      { path: "*", element: <Page404 /> },
    ],
  },
  {
    path: ADMIN_PATHS.AUTH.BASE, // "/admin/auth"
    children: [
      { path: ADMIN_PATHS.AUTH.LOGIN.replace(ADMIN_PATHS.AUTH.BASE + '/', ''), element: <LoginPage /> },
      { path: ADMIN_PATHS.AUTH.REGISTER.replace(ADMIN_PATHS.AUTH.BASE + '/', ''), element: <Register /> },
      { path: "*", element: <Navigate to={ADMIN_PATHS.AUTH.LOGIN} /> },
    ],
  },
];
