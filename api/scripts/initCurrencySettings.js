const mongoose = require('mongoose');
const Setting = require('../features/settings/settings.model');

// Default currency rates (you should update these with real rates)
const defaultCurrencyRates = {
  rates: {
    USD: { currency: 'USD', rate: 1.0, symbol: '$' },
    EUR: { currency: 'EUR', rate: 0.85, symbol: '€' },
    GBP: { currency: 'GBP', rate: 0.73, symbol: '£' },
    CAD: { currency: 'CAD', rate: 1.25, symbol: 'C$' },
    AUD: { currency: 'AUD', rate: 1.35, symbol: 'A$' },
    JPY: { currency: 'JPY', rate: 110.0, symbol: '¥' },
    CNY: { currency: 'CNY', rate: 6.45, symbol: '¥' },
    INR: { currency: 'INR', rate: 74.5, symbol: '₹' },
    BDT: { currency: 'BDT', rate: 85.0, symbol: '৳' }
  }
};

async function initCurrencySettings() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://mdhgtushar:DTtZgDAU3i5Ujg6b@cluster0.0ba1y.mongodb.net/');
    console.log('Connected to MongoDB');

    // Check if currency settings already exist
    const existingSettings = await Setting.findOne({ key: 'currency' });
    
    if (existingSettings) {
      console.log('Currency settings already exist. Updating...');
      existingSettings.value = defaultCurrencyRates;
      await existingSettings.save();
      console.log('Currency settings updated successfully');
    } else {
      console.log('Creating new currency settings...');
      const newSettings = new Setting({
        key: 'currency',
        value: defaultCurrencyRates
      });
      await newSettings.save();
      console.log('Currency settings created successfully');
    }

    console.log('Available currencies:');
    Object.values(defaultCurrencyRates.rates).forEach(rate => {
      console.log(`- ${rate.currency}: ${rate.symbol} (Rate: ${rate.rate})`);
    });

  } catch (error) {
    console.error('Error initializing currency settings:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
initCurrencySettings(); 