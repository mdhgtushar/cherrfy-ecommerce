const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware');
const { followStore, unfollowStore, getFollowedStores } = require('./followedStore.controller');

router.post('/follow', protect, followStore);
router.post('/unfollow', protect, unfollowStore);
router.get('/', protect, getFollowedStores);

module.exports = router; 