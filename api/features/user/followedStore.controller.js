const FollowedStore = require('./followedStore.model');
const User = require('./user.model');

exports.followStore = async (req, res) => {
  try {
    const { storeId } = req.body;
    if (!storeId) return res.status(400).json({ success: false, message: 'Store ID required' });
    const store = await User.findById(storeId);
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
    const followed = await FollowedStore.create({ user: req.user._id, store: storeId });
    res.status(201).json({ success: true, data: followed });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: 'Already following' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unfollowStore = async (req, res) => {
  try {
    const { storeId } = req.body;
    await FollowedStore.findOneAndDelete({ user: req.user._id, store: storeId });
    res.json({ success: true, message: 'Unfollowed store' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFollowedStores = async (req, res) => {
  try {
    const stores = await FollowedStore.find({ user: req.user._id }).populate('store');
    res.json({ success: true, data: stores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 