const express = require('express');
const adminController = require('../controllers/adminAuth.controller.js');
const router = express.Router();

router.post('/', adminController.login);
router.post('/register', adminController.register);
router.get('/protected', adminController.protectedRoute);
router.get('/allAdmins', adminController.getAllAdmins); // Get all admins

module.exports = router;
