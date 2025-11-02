// models/shippingAddressModel.js
import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User collection
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    isDefault: {
      type: Boolean,
      default: false, // You can mark one address as default
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);
export default ShippingAddress;
