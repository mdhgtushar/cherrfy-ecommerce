// src/routes/userRoutes.js

import Layout from '../layout/user/Layout';
import MainPage from '../user/MainPage';
import ProductView from '../user/ProductView';
import About from '../user/About';
import CartPage from '../user/CartPage';
import OrderForm from '../user/OrderForm';
import { USER_PATHS } from './paths';
import LoginPage from '../user/LoginPage';
import RegisterPage from '../user/RegisterPage';
import SearchResultPage from '../user/SearchResultPage';
import OrdersPage from '../user/OrderPage';
import OrderDetails from '../user/OrderDetails';
import UserDashboardPage from '../user/UserDashboardPage';
import ProfileLayout from '../layout/user/profile/ProfileLayout';
import UserProfile from '../user/UserProfile';
import Page404 from '../user/Page404'; 
import MyReviews from '../user/MyReviews';
import Settings from '../user/Settings';
export const userRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <MainPage /> },
      { path: USER_PATHS.PRODUCTS, element: <ProductView /> },
      { path: USER_PATHS.SEARCH, element: <SearchResultPage /> },
      { path: USER_PATHS.ABOUT.slice(1), element: <About /> },   // slice(1) to remove '/'
      { path: USER_PATHS.CART.slice(1), element: <CartPage /> },
      // { path: USER_PATHS.ORDER.slice(1), element: <OrdersPage /> },
      { path: USER_PATHS.ORDER_DETAILS.slice(1), element: <OrderDetails /> },
      { path: USER_PATHS.CHECKOUT.slice(1), element: <OrderForm /> },
      // { path: USER_PATHS.PROFILE.slice(1), element: <UserDashboardPage /> },
      { path: USER_PATHS.LOGIN.slice(1), element: <LoginPage /> },
      { path: USER_PATHS.REGISTER.slice(1), element: <RegisterPage /> },
      { path: '*', element: <Page404 /> },
      {
        element: <ProfileLayout />,
        path: USER_PATHS.PROFILE,
        children: [
          { path: USER_PATHS.PROFILE, element: <UserProfile /> },
          { path: USER_PATHS.ORDER.split('/').pop(), element: <OrdersPage /> },
          { path: USER_PATHS.MANAGEPROFILE.split('/').pop(), element: <UserDashboardPage /> },
          { path: USER_PATHS.MY_REVIEWS.split('/').pop(), element: <MyReviews /> },
          { path: USER_PATHS.SETTINGS.split('/').pop(), element: <Settings /> },
          { path: '*', element: <Page404 /> },
        ]
      },

    ],
  },

];
