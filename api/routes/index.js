const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running...');
});

router.use('/auth', require('./adminAuth.route.js'));
router.use('/product', require('./product.route.js'));

module.exports = router;