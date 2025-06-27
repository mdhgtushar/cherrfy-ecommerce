const express = require('express');
const router = express.Router();
const { freightQuery } = require('./logistic.controller.js');

router.post('/', freightQuery);

module.exports = router;