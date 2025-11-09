import PaymentMethod from "./paymentMethod.model.js";

/**
 * @desc    Add a new payment method
 * @route   POST /api/payment-methods
 * @access  Private
 */
export const addPaymentMethod = async (req, res) => {
  try {
    const { type, provider, accountNumber, expiryDate, isDefault } = req.body;

    if (!type || !provider || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: "Type, provider, and account number are required",
      });
    }

    // Unset previous default if this is the new default
    if (isDefault) {
      await PaymentMethod.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    const paymentMethod = await PaymentMethod.create({
      user: req.user._id,
      type,
      provider,
      accountNumber,
      expiryDate,
      isDefault: !!isDefault,
    });

    res.status(201).json({
      success: true,
      message: "Payment method added successfully",
      data: paymentMethod,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all payment methods for the user
 * @route   GET /api/payment-methods
 * @access  Private
 */
export const getUserPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      message: "Payment methods retrieved successfully",
      data: methods,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a payment method
 * @route   PUT /api/payment-methods/:id
 * @access  Private
 */
export const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, provider, accountNumber, expiryDate, isDefault } = req.body;

    const method = await PaymentMethod.findOne({ _id: id, user: req.user._id });
    if (!method) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    if (isDefault) {
      await PaymentMethod.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    Object.assign(method, {
      type,
      provider,
      accountNumber,
      expiryDate,
      isDefault: !!isDefault,
    });

    const updated = await method.save();

    res.json({
      success: true,
      message: "Payment method updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a payment method
 * @route   DELETE /api/payment-methods/:id
 * @access  Private
 */
export const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PaymentMethod.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    res.json({
      success: true,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Set default payment method
 * @route   PATCH /api/payment-methods/default/:id
 * @access  Private
 */
export const setDefaultPaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const method = await PaymentMethod.findOne({ _id: id, user: req.user._id });
    if (!method) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    await PaymentMethod.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    method.isDefault = true;
    await method.save();

    res.json({
      success: true,
      message: "Default payment method set successfully",
      data: method,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
