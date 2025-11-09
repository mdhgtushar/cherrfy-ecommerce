import mongoose from "mongoose";

const returnRefundSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: String,
      ref: "Order",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    reason: {
      type: String,
      required: true,
      // enum: [
      //   "Damaged item",
      //   "Wrong item received",
      //   "Item not as described",
      //   "Size/fit issue",
      //   "Other",
      // ],
    },

    description: {
      type: String,
    },

    images: [
      {
        type: String, // URLs of uploaded images (proof)
      },
    ],

    requestType: {
      type: String,
      enum: ["Return", "Refund", "Return & Refund"],
      default: "Return & Refund",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Processing",
        "Completed",
        "Refunded",
      ],
      default: "Pending",
    },

    refund: {
      amount: { type: Number, default: 0 },
      method: {
        type: String,
        enum: ["Original Payment Method", "Store Credit", "Bank Transfer"],
        default: "Original Payment Method",
      },
      transactionId: { type: String },
      date: { type: Date },
    },

    returnShipping: {
      carrier: { type: String },
      trackingNumber: { type: String },
      received: { type: Boolean, default: false },
    },

    adminNote: {
      type: String,
    },
  },
  { timestamps: true }
);

const ReturnRefund = mongoose.model("ReturnRefund", returnRefundSchema);
export default ReturnRefund;
