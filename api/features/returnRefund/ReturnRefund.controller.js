import ReturnRefund from "./ReturnRefund.model.js";
 

// ✅ Create a new Return or Refund Request
export const createReturnRefund = async (req, res) => {
  try {
    const { order, product, reason, description, images, requestType } = req.body;

    if (!order || !product || !reason) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newRequest = await ReturnRefund.create({
      user: req.user._id,
      order,
      product,
      reason,
      description,
      images,
      requestType,
    });

    res.status(201).json({
      success: true,
      message: "Return/Refund request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating return/refund:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get all return/refund requests (Admin)
export const getAllReturnRefunds = async (req, res) => {
  try {
    const requests = await ReturnRefund.find()
      .populate("user", "name email")
      .populate("order", "_id totalAmount status")
      .populate("product", "name price");

    res.status(200).json({
      success: true,
      message: "All return/refund requests retrieved",
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching return/refund requests:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get return/refund requests for a specific user
export const getUserReturnRefunds = async (req, res) => {
  try {
    const requests = await ReturnRefund.find({ user: req.user._id })
      .populate("order", "_id totalAmount status")
      .populate("product", "name price");

    res.status(200).json({
      success: true,
      message: "User return/refund requests retrieved",
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching user return/refund requests:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get a single return/refund request by ID
export const getReturnRefundById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ReturnRefund.findById(id)
      .populate("user", "name email")
      .populate("order", "_id totalAmount status")
      .populate("product", "name price");

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Update status (Admin only)
export const updateReturnRefundStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, refund, adminNote, returnShipping } = req.body;

    const updatedRequest = await ReturnRefund.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          refund,
          adminNote,
          returnShipping,
        },
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Return/refund status updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Delete a return/refund request
export const deleteReturnRefund = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ReturnRefund.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Return/refund request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
