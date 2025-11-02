import express from "express";
import {
  addPaymentMethod,
  getUserPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from "../controllers/paymentMethodController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth middleware

const router = express.Router();

router
  .route("/")
  .post(protect, addPaymentMethod)
  .get(protect, getUserPaymentMethods);

router
  .route("/:id")
  .put(protect, updatePaymentMethod)
  .delete(protect, deletePaymentMethod);

router.patch("/default/:id", protect, setDefaultPaymentMethod);

export default router;
