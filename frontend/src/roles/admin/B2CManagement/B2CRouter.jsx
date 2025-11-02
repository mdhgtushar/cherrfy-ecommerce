import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerManagement from "./CustomerManagement";
import OrderManagement from "./OrderManagement";
import WishlistManagement from "./WishlistManagement";
import ReviewsManagement from "./ReviewsManagement";
import PricingManagement from "./PricingManagement";
import CouponsManagement from "./CouponsManagement";
import LoyaltyManagement from "./LoyaltyManagement";
import B2CTest from "./B2CTest";

const B2CRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/manage-admin/b2c/customers" replace />} />
      <Route path="test" element={<B2CTest />} />
      <Route path="customers" element={<CustomerManagement />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="wishlist" element={<WishlistManagement />} />
      <Route path="reviews" element={<ReviewsManagement />} />
      <Route path="pricing" element={<PricingManagement />} />
      <Route path="coupons" element={<CouponsManagement />} />
      <Route path="loyalty" element={<LoyaltyManagement />} />
    </Routes>
  );
};

export default B2CRouter;
