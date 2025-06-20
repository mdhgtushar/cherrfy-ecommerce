const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running...');
});

router.use('/auth', require('./features/admin/adminAuth.route.js'));
router.use("/user/auth", require("./features/user/userAuth.route.js"));
router.use('/product', require('./features/product/product.route.js'));

module.exports = router;