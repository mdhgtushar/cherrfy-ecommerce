
const axios = require('axios');
const crypto = require('crypto');
const productModel = require('./product.model');
const GetAliProductInfo = require('../../util/GetAliProductInfo');

const countries = [
  "US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "PL",
  "SE", "NO", "FI", "DK", "IE", "PT", "BE", "CH", "AT", "CZ",
  "SK", "HU", "RO", "BG", "GR", "SI", "HR", "EE", "LV", "LT",
  "LU", "MT", "CY", "NZ", "AE", "IL", "TR", "MX", "BR", "AR",
  "ZA", "BD"
];


exports.getAliExpressProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }

  const existingProduct = await productModel.findOne({ productId: productId });
  if (existingProduct) {
    return res.status(409).json({ message: 'Product already exists.' });
  }

  const appKey = '510834';
  const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
  const accessToken = '50000100d16Aa7nunrCY4gWGhqcw17bc6efbTiXEfxgKTVcfGPp0HxzEF4xQJ5K5O4Vt';
  const apiUrl = 'https://api-sg.aliexpress.com/sync';
  const method = 'aliexpress.ds.product.get';
  const aliexpressCategoryId = '200135143';

  const result = {};

  try {
    for (const country of countries) {
      const timestamp = Date.now();
      const params = {
        method,
        app_key: appKey,
        access_token: accessToken,
        timestamp,
        product_id: productId,
        ship_to_country: country,
        sign_method: 'sha256',
        aliexpress_category_id: aliexpressCategoryId
      };

      const sortedKeys = Object.keys(params).sort();
      const signString = sortedKeys.map(key => key + params[key]).join('');
      const sign = crypto
        .createHmac('sha256', appSecret)
        .update(signString)
        .digest('hex')
        .toUpperCase();

      params.sign = sign;
      const query = new URLSearchParams(params).toString();
      const url = `${apiUrl}?${query}`;

      const response = await axios.get(url);
      const data = response.data?.aliexpress_ds_product_get_response?.result;

      if (data) {
        result[country] = data;
      }
    }

    if (Object.keys(result).length === 0) {
      return res.status(404).json({ message: 'No product data found for any country.' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('AliExpress API Error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch product info.', error: error });
  }
};

exports.createAliExpressProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }

  const appKey = '510834';
  const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
  const accessToken = '50000100d16Aa7nunrCY4gWGhqcw17bc6efbTiXEfxgKTVcfGPp0HxzEF4xQJ5K5O4Vt';
  const apiUrl = 'https://api-sg.aliexpress.com/sync';
  const method = 'aliexpress.ds.product.get';
  const aliexpressCategoryId = '200135143';

  const aliData = {};

  try {
    for (const country of countries) {
      const timestamp = Date.now();
      const params = {
        method,
        app_key: appKey,
        access_token: accessToken,
        timestamp,
        product_id: productId,
        ship_to_country: country,
        sign_method: 'sha256',
        aliexpress_category_id: aliexpressCategoryId
      };

      const sortedKeys = Object.keys(params).sort();
      const signString = sortedKeys.map(key => key + params[key]).join('');
      const sign = crypto
        .createHmac('sha256', appSecret)
        .update(signString)
        .digest('hex')
        .toUpperCase();

      params.sign = sign;
      const query = new URLSearchParams(params).toString();
      const url = `${apiUrl}?${query}`;

      const response = await axios.get(url);
      const data = response.data?.aliexpress_ds_product_get_response?.result;

      if (data) {
        aliData[country] = data;
      }
    }

    if (Object.keys(aliData).length === 0) {
      return res.status(404).json({ message: 'No product data found for any country.' });
    }

    // Create new document in MongoDB
    const newProduct = new productModel({
      productId,
      ali_data: aliData
    });

    await newProduct.save();

    return res.status(201).json({
      message: 'AliExpress product data saved successfully.',
      data: newProduct
    });

  } catch (error) {
    console.error('AliExpress Save Error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to fetch/save AliExpress data.', error: error });
  }
};

exports.getProductById = async (req, res) => {
  // get the country code from query parameters
  const countryCode = req.query.country?.toUpperCase(); // Make it case-insensitive

  if (!countryCode) {
    return res.status(400).json({ message: 'Country code is required.' });
  }
  if (!countries.includes(countryCode)) {
    return res.status(400).json({ message: 'Invalid country code.' });
  }
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }
    // Find the product by ID and include only the ali_data for the specified country
    const product = await productModel.findOne(
      { _id: productId },
      { [`ali_data.${countryCode}`]: 1, productId: 1 } // Only return the ali_data for the specified country
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json(product.ali_data[countryCode] || { message: 'No data available for this country.' });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};


exports.getAllProducts = async (req, res) => {
  const countryCode = req.query.country?.toUpperCase(); // Make it case-insensitive

  if (!countryCode) {
    return res.status(400).json({ message: 'Country code is required.' });
  }

  if (!countries.includes(countryCode)) {
    return res.status(400).json({ message: 'Invalid country code.' });
  }

  try {
    // শুধু যেসব প্রোডাক্টে নির্দিষ্ট দেশের ali_data আছে সেগুলো আনো
    const products = await productModel.find(
      { [`ali_data.${countryCode}`]: { $exists: true } },
      { [`ali_data.${countryCode}`]: 1, productId: 1 } // শুধু প্রয়োজনীয় ফিল্ড দেখাও
    );

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
}