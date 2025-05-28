// src/routes/userRoutes.js

import Layout from './userLayout/Layout';
import MainPage from './MainPage';
import ProductView from './ProductView';
import About from './About';
import CartPage from './CartPage';
import OrderForm from './OrderForm';
import USER_PATHS from './USER_PATHS';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SearchResultPage from './SearchResultPage';
import OrdersPage from './OrderPage';
import OrderDetails from './OrderDetails';
import UserDashboardPage from './UserDashboardPage';
import ProfileLayout from './userLayout/profile/ProfileLayout';
import UserProfile from './UserProfile';
import Page404 from './Page404'; 
import MyReviews from './MyReviews';
import Settings from './Settings';
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
