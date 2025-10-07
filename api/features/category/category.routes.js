const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth.middleware.js');
const {admin} = require('../../middleware/auth.middleware.js');
const asyncHandler = require("express-async-handler");

const {
    createCategory, 
    getAllCategories,
    deleteCategory
} = require('./category.controller.js');

router.post('/', protect, admin, asyncHandler(createCategory));
router.get('/', asyncHandler(getAllCategories));
router.delete('/:id', protect, admin, asyncHandler(deleteCategory));

module.exports = router;