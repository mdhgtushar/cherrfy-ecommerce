import express from "express";
import {
  createReturnRefund,
  getAllReturnRefunds,
  getUserReturnRefunds,
  getReturnRefundById,
  updateReturnRefundStatus,
  deleteReturnRefund,
} from "./ReturnRefund.controller.js";
import { protect, admin } from "../../middleware/auth.middleware.js";

const router = express.Router();

// ✅ User Routes
router.post("/", protect, createReturnRefund);
router.get("/my-requests", protect, getUserReturnRefunds);
router.get("/:id", protect, getReturnRefundById);

// ✅ Admin Routes
router.get("/", protect, admin, getAllReturnRefunds);
router.put("/:id", protect, admin, updateReturnRefundStatus);
router.delete("/:id", protect, admin, deleteReturnRefund);

export default router;
