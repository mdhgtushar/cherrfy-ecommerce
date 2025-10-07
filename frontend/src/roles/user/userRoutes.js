// src/routes/userRoutes.js

import Layout from './userLayout/Layout';
import MainPage from './site/MainPage';
import ProductView from './products/ProductView';
import About from './site/About';
import CartPage from './Order/CartPage';
import OrderForm from './Order/OrderForm';
import USER_PATHS from './USER_PATHS';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import SearchResultPage from './searchResult/SearchResultPage';
import OrdersPage from './Order/OrderPage';
import OrderDetails from './Order/OrderDetails';
import ProfileLayout from './userLayout/profile/ProfileLayout';
import Page404 from './site/Page404';
import MyReviews from './review/MyReviews';
import Settings from './profile/Settings';
import UserOverview from './profile/UserOverview';
import ManageAccount from './profile/ManageAccount';
import ReturnAndRefund from './profile/ReturnAndRefund';
import WishlistAndStores from './profile/WishlistAndStores';
import DisputeCenter from './profile/DisputeCenter';
import PrivateRoute from './userLayout/PrivateRoute';
import ProductDetails from './products/ProductDetails';
import TermsOfService from './site/TermsOfService';
import PrivacyPolicy from './site/PrivacyPolicy';
export const userRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <MainPage /> },
      { path: USER_PATHS.PRODUCTS, element: <ProductDetails /> },
      { path: USER_PATHS.SEARCH, element: <SearchResultPage /> },
      { path: USER_PATHS.ABOUT.slice(1), element: <About /> },   // slice(1) to remove '/'
      { path: USER_PATHS.CART.slice(1), element: <CartPage /> },
      // { path: USER_PATHS.ORDER.slice(1), element: <OrdersPage /> },
      { path: USER_PATHS.ORDER_DETAILS.slice(1), element: <OrderDetails /> },
      { path: USER_PATHS.CHECKOUT.slice(1), element: <OrderForm /> },
      // { path: USER_PATHS.PROFILE.slice(1), element: <UserDashboardPage /> },
      { path: USER_PATHS.LOGIN.slice(1), element: <LoginPage /> },
      { path: USER_PATHS.REGISTER.slice(1), element: <RegisterPage /> },
      { path: USER_PATHS.TERMS_OF_SERVICE.slice(1), element: <TermsOfService /> },
      { path: USER_PATHS.PRIVACY_POLICY.slice(1), element: <PrivacyPolicy /> },
      { path: '*', element: <Page404 /> },
      {
        element: <PrivateRoute><ProfileLayout /></PrivateRoute>,
        path: USER_PATHS.PROFILE,
        children: [
          { path: USER_PATHS.PROFILE, element: <UserOverview /> },
          { path: USER_PATHS.ORDER.split('/').pop(), element: <OrdersPage /> },
          { path: USER_PATHS.MANAGEPROFILE.split('/').pop(), element: <ManageAccount /> },
          { path: USER_PATHS.RETURN_AND_REFUND.split('/').pop(), element: <ReturnAndRefund /> },
          { path: USER_PATHS.WISHLIST_AND_FOLLOWED_STORES.split('/').pop(), element: <WishlistAndStores /> },
          { path: USER_PATHS.APPEAL_DISPUTE_CENTER.split('/').pop(), element: <DisputeCenter /> },
          { path: USER_PATHS.MY_REVIEWS.split('/').pop(), element: <MyReviews /> },
          { path: USER_PATHS.SETTINGS.split('/').pop(), element: <Settings /> },
          { path: '*', element: <Page404 /> },
        ]
      },

    ],
  },

];
