const express = require("express");
const {
  createReturnRefund,
  getAllReturnRefunds,
  getUserReturnRefunds,
  getReturnRefundById,
  updateReturnRefundStatus,
  deleteReturnRefund,
} = require("./ReturnRefund.controller");
const { protect, admin } = require("../../middleware/auth.middleware");

const router = express.Router();

// ✅ User Routes
router.post("/", protect, createReturnRefund);
router.get("/my-requests", protect, getUserReturnRefunds);
router.get("/:id", protect, getReturnRefundById);

// ✅ Admin Routes
router.get("/", protect, admin, getAllReturnRefunds);
router.put("/:id", protect, admin, updateReturnRefundStatus);
router.delete("/:id", protect, admin, deleteReturnRefund);

module.exports = router;
