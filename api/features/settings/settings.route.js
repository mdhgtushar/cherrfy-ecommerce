const express = require('express');
const settingsController = require('./settings.controller.js');

const router = express.Router();

// GET /api/settings
// router.get('/', settingsController.getAllSettings);
router.get('/key/:key', settingsController.getSettingByKey);
router.put('/key/:key', settingsController.updateSetting);
router.post('/', settingsController.addSetting);
router.get('/currency', settingsController.getCurrency);
router.post('/currency', settingsController.saveCurrencyFromAPI);

module.exports = router;