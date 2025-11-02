import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The owner of this payment method
      required: true,
    },
    type: {
      type: String,
      enum: ["Card", "PayPal", "Bank", "MobileBanking", "CashOnDelivery"],
      required: [true, "Payment type is required"],
    },
    provider: {
      type: String,
      trim: true,
      required: [true, "Payment provider name is required"], // e.g., Visa, bKash, Nagad, etc.
    },
    accountNumber: {
      type: String,
      required: [true, "Account number or identifier is required"],
    },
    expiryDate: {
      type: String, // e.g., "12/26" for cards
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
