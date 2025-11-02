const mongoose = require('mongoose');

const followedStoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // assuming store is a user with vendor role
  createdAt: { type: Date, default: Date.now }
});

followedStoreSchema.index({ user: 1, store: 1 }, { unique: true });

module.exports = mongoose.model('FollowedStore', followedStoreSchema); 