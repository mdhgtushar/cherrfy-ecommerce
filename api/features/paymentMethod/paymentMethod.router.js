const express = require("express");

const {
  addPaymentMethod,
  getUserPaymentMethods, 
  updatePaymentMethod,  
  deletePaymentMethod,
  setDefaultPaymentMethod
} = require("./paymentMethod.controller.js");
const { protect } = require("../../middleware/auth.middleware.js"); 

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

module.exports = router;  
