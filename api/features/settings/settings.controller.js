const Setting = require('./settings.model');
const axios = require('axios');

const apiKey = 'a614e63aba104d0a867f27c69ff68ac4';
const countryCurrencyMap = {
  US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', DE: 'EUR',
  FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', PL: 'PLN',
  SE: 'SEK', NO: 'NOK', FI: 'EUR', DK: 'DKK', IE: 'EUR',
  PT: 'EUR', BE: 'EUR', CH: 'CHF', AT: 'EUR', CZ: 'CZK',
  SK: 'EUR', HU: 'HUF', RO: 'RON', BG: 'BGN', GR: 'EUR',
  SI: 'EUR', HR: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR',
  LU: 'EUR', MT: 'EUR', CY: 'EUR', NZ: 'NZD', AE: 'AED',
  IL: 'ILS', TR: 'TRY', MX: 'MXN', BR: 'BRL', AR: 'ARS',
  ZA: 'ZAR', BD: 'BDT'
};


// Get all settings
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find().lean();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single setting by key
exports.getSettingByKey = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key }).lean();
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCurrency = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: 'currency' }).lean();
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a setting by key
exports.updateSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.body.key });
    if (!setting) {
      const newSetting = await Setting.create({ key: req.body.key, value: req.body.value });
      res.json(newSetting);
    }
    const updated = await Setting.findOneAndUpdate(
      { key: req.body.key },
      { value: req.body.value },
      { new: true }
    ).lean();
    if (!updated) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new setting
exports.addSetting = async (req, res) => {
  try {
    const added = await Setting.create(req.body);
    res.json(added);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveCurrencyFromAPI = async (req, res) => {
  try {
    const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
    const json = response.data;

    if (!json.rates) {
      return res.status(400).json({ message: 'Invalid response from API' });
    }

    const filtered = {};
    for (const [country, currency] of Object.entries(countryCurrencyMap)) {
      if (json.rates[currency]) {
        filtered[country] = {
          currency,
          rate: parseFloat(json.rates[currency])
        };
      }
    }

    const finalData = {
      source: 'live',
      updated_at: new Date().toISOString(),
      rates: filtered,
      timestamp: Date.now()
    };

    const result = await Setting.findOneAndUpdate(
      { key: 'currency' },
      { value: finalData },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: 'Currency data fetched and saved successfully',
      data: result
    });
  } catch (err) {
    console.error('Error fetching/saving currency data:', err.message);
    res.status(500).json({ message: 'Server error while saving currency data' });
  }
};
