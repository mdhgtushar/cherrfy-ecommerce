// src/routes/userRoutes.js

import Layout from '../layout/user/Layout';
import MainPage from '../user/MainPage';
import ProductView from '../user/ProductView';
import About from '../user/About';
import CartPage from '../user/CartPage';
import OrderForm from '../features/order/OrderForm';
import { USER_PATHS } from './paths';

export const userRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <MainPage /> },
      { path: USER_PATHS.PRODUCTS, element: <ProductView /> },
      { path: USER_PATHS.ABOUT.slice(1), element: <About /> },   // slice(1) to remove '/'
      { path: USER_PATHS.CART.slice(1), element: <CartPage /> },
      { path: USER_PATHS.ORDER.slice(1), element: <OrderForm /> },
      { path: '*', element: <h1>Page Not Found</h1> },
    ],
  },
];
