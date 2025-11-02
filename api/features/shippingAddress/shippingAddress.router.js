import express from "express";
import {
  createShippingAddress,
  getUserAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  setDefaultAddress,
} from "../controllers/shippingAddressController.js";
import { protect } from "../middleware/authMiddleware.js"; // assumes JWT auth middleware

const router = express.Router();

router.route("/")
  .post(protect, createShippingAddress)
  .get(protect, getUserAddresses);

router.route("/:id")
  .put(protect, updateShippingAddress)
  .delete(protect, deleteShippingAddress);

router.patch("/default/:id", protect, setDefaultAddress);

export default router;
