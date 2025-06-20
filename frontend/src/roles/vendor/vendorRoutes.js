import ProductList from "../admin/products/list/ProductList";
import ProductListPage from "../admin/products/list/ProductListPage";
import VandorLayout from "./vandorLayout/VandorLayout";
import Page404 from "../user/site/Page404";
import Dashboard from "./Dashboard";
import OrderList from "./OrderList";
import Settings from "./Settings";

// This will show Page404 for any invalid nested route like /manage-vandor/somethingerror
export const vandorRoutes = [
  {
    path: "/manage-vandor",
    element: <VandorLayout />,
    children: [
      // your valid sub-routes can be defined here like:
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductListPage /> },
      { path: "orders", element: <OrderList /> },
      { path: "settings", element: <Settings /> },

      // catch-all for unmatched nested routes under /manage-vandor
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];
