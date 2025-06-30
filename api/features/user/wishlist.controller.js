const Wishlist = require('./wishlist.model');
const Product = require('../product/product.model');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'Product ID required' });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const wishlist = await Wishlist.create({ user: req.user._id, product: productId });
    res.status(201).json({ success: true, data: wishlist });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: 'Already in wishlist' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    await Wishlist.findOneAndDelete({ user: req.user._id, product: productId });
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate('product');
    res.json({ success: true, data: wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 