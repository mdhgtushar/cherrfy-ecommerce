const express = require("express");
const {
  createShippingAddress,
  getUserAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  setDefaultAddress,
} = require("./shippingAddress.controller.js");
const { protect } = require("../../middleware/authMiddleware.js"); // assumes JWT auth middleware

const router = express.Router();

router.route("/")
  .post(protect, createShippingAddress)
  .get(protect, getUserAddresses);

router.route("/:id")
  .put(protect, updateShippingAddress)
  .delete(protect, deleteShippingAddress);

router.patch("/default/:id", protect, setDefaultAddress);

module.exports = router;
