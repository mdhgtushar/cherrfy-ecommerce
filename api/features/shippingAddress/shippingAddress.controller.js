import ShippingAddress from "./shippingAddress.model.js";

/**
 * @desc    Create new shipping address
 * @route   POST /api/shipping-address
 * @access  Private
 */
export const createShippingAddress = async (req, res) => {
  try {
    const { fullName, phone, address, city, postalCode, country, isDefault } = req.body;

    if (!fullName || !phone || !address || !city || !postalCode || !country) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // If marked as default, unset previous default address
    if (isDefault) {
      await ShippingAddress.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    const newAddress = await ShippingAddress.create({
      user: req.user._id,
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
      isDefault: !!isDefault,
    });

    res.status(201).json({
      success: true,
      message: "Shipping address added successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all addresses for a user
 * @route   GET /api/shipping-address
 * @access  Private
 */
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Addresses retrieved successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a shipping address
 * @route   PUT /api/shipping-address/:id
 * @access  Private
 */
export const updateShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, address, city, postalCode, country, isDefault } = req.body;

    const shippingAddress = await ShippingAddress.findOne({ _id: id, user: req.user._id });

    if (!shippingAddress) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (isDefault) {
      await ShippingAddress.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    Object.assign(shippingAddress, {
      fullName,
      phone,
      address,
      city,
      postalCode,
      country,
      isDefault: !!isDefault,
    });

    const updated = await shippingAddress.save();

    res.json({
      success: true,
      message: "Shipping address updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a shipping address
 * @route   DELETE /api/shipping-address/:id
 * @access  Private
 */
export const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ShippingAddress.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({
      success: true,
      message: "Shipping address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Set default address
 * @route   PATCH /api/shipping-address/default/:id
 * @access  Private
 */
export const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await ShippingAddress.findOne({ _id: id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    await ShippingAddress.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    address.isDefault = true;
    await address.save();

    res.json({
      success: true,
      message: "Default address set successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
