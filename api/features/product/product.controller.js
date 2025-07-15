const axios = require('axios');
const crypto = require('crypto');
const productModel = require('./product.model');
const Setting = require('../settings/settings.model');

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
    console.error('AliExpress API Error:', error.response?.data || error.message); // Log error details
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
  const countryCode = req.query.country?.toUpperCase();
  const currencyCode = req.query.currency?.toUpperCase();

  if (!countryCode || !currencyCode) {
    return res.status(400).json({ message: 'Country and currency code are required.' });
  }

  if (!countries.includes(countryCode)) {
    return res.status(400).json({ message: 'Invalid country code.' });
  }

  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    console.log('getProductById called with productId:', productId);
    console.log('getProductById called with countryCode:', countryCode);
    console.log('getProductById called with currencyCode:', currencyCode);

    // Try to find by productId first, then by _id
    let product = await productModel.findOne({ productId: productId });
    
    if (!product) {
      console.log('Product not found by productId, trying _id...');
      // If not found by productId, try by _id
      product = await productModel.findById(productId);
    }

    if (!product) {
      console.log('Product not found by either productId or _id');
      return res.status(404).json({ message: 'Product not found.' });
    }

    console.log('Product found:', {
      productId: product.productId,
      _id: product._id,
      hasAliData: !!product.ali_data
    });

    // If this is an AliExpress product (has ali_data), return the full data
    if (product.ali_data) {
      console.log('Returning full ali_data for AliExpress product');
      return res.status(200).json({
        productId: product.productId,
        _id: product._id,
        ali_data: product.ali_data
      });
    }

    // For regular products, return country-specific data
    const aliData = product.ali_data?.[countryCode];
    if (!aliData) {
      return res.status(404).json({ message: 'No data for this country.' });
    }

    // === Currency Rate Fetch ===
    const setting = await Setting.findOne({ key: 'currency' });
    const rates = setting?.value?.rates;

    const targetRateObj = Object.values(rates).find(
      (obj) => obj.currency === currencyCode
    );

    if (!targetRateObj) {
      return res.status(400).json({ message: 'Currency rate not found.' });
    }

    const rate = targetRateObj.rate;

    const skus =
      aliData?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o || [];

    if (!skus.length) {
      return res.status(404).json({ message: 'No SKU data found.' });
    }

    const convertedSkus = skus.map((sku) => ({
      ...sku,
      original_price: sku.sku_price,
      converted_currency: currencyCode,
      sku_price: (parseFloat(sku.sku_price) * rate).toFixed(2),
      offer_sale_price: (parseFloat(sku.offer_sale_price) * rate).toFixed(2),
      offer_bulk_sale_price: (parseFloat(sku.offer_bulk_sale_price) * rate).toFixed(2),
    }));

    return res.status(200).json({
      productId: product.productId,
      product_id: product.productId,
      name: aliData?.ae_item_base_info_dto?.subject || 'Unknown Product',
      images: (aliData?.ae_multimedia_info_dto?.image_urls?.split(';') || []),
      country: countryCode,
      currency: currencyCode,
      rate,
      skus: convertedSkus,
      property: aliData?.ae_item_properties?.ae_item_property || [],
      description: aliData?.ae_item_description_dto?.description || '',
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};


exports.getAllProducts = async (req, res) => {
  const countryCode = req.query.country?.toUpperCase();
  const currencyCode = req.query.currency?.toUpperCase();

  if (!countryCode || !currencyCode) {
    return res.status(400).json({ 
      success: false,
      message: 'Country and currency code are required.',
      error: 'Missing required parameters'
    });
  }

  if (!countries.includes(countryCode)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid country code.',
      error: 'Country not supported',
      supportedCountries: countries
    });
  }

  try {
    // Get currency rate from settings
    const currencySetting = await Setting.findOne({ key: 'currency' });
    const currencyRates = currencySetting?.value?.rates;

    if (!currencyRates) {
      return res.status(500).json({ 
        success: false,
        message: 'Currency rates not found. Please contact administrator.',
        error: 'Currency settings missing'
      });
    }

    const matchedRate = Object.values(currencyRates).find(
      (rateObj) => rateObj.currency === currencyCode
    );

    if (!matchedRate || !matchedRate.rate) {
      return res.status(400).json({ 
        success: false,
        message: `Currency rate not found for ${currencyCode}.`,
        error: 'Currency not supported',
        availableCurrencies: Object.values(currencyRates).map(r => r.currency)
      });
    }

    const rate = matchedRate.rate;

    // Fetch only products with ali_data for that country
    const products = await productModel.find(
      { [`ali_data.${countryCode}`]: { $exists: true } },
      { [`ali_data.${countryCode}`]: 1, productId: 1 }
    );

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products found for this country.',
        data: [],
        count: 0,
        country: countryCode,
        currency: currencyCode
      });
    }

    // Process to find minimum-priced SKU only
    const updatedProducts = products.map((product) => {
      const skuList =
        product.ali_data?.[countryCode]?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o || [];

      if (!skuList.length) return null;

      // Find the SKU with minimum offer_sale_price
      const minSku = skuList.reduce((min, curr) =>
        parseFloat(curr.offer_sale_price) < parseFloat(min.offer_sale_price) ? curr : min
      );

      const convertedSku = {
        ...minSku,
        original_price: minSku.sku_price,
        sku_price: (parseFloat(minSku.sku_price) * rate).toFixed(2),
        offer_sale_price: (parseFloat(minSku.offer_sale_price) * rate).toFixed(2),
        offer_bulk_sale_price: (parseFloat(minSku.offer_bulk_sale_price) * rate).toFixed(2),
        converted_currency: currencyCode,
      };

      return {
        _id: product._id,
        name: product.ali_data?.[countryCode]?.ae_item_base_info_dto?.subject || 'Unknown Product',
        images: (product.ali_data?.[countryCode]?.ae_multimedia_info_dto?.image_urls?.split(';') || []).slice(0, 4),
        productId: product.productId,
        country: countryCode,
        currency: currencyCode,
        price: convertedSku.offer_sale_price,
        rate,
        sku: convertedSku,
      };
    });

    // Filter out any nulls (if sku data missing)
    const validProducts = updatedProducts.filter(Boolean);

    return res.status(200).json({
      success: true,
      message: 'Products loaded successfully',
      data: validProducts,
      count: validProducts.length,
      country: countryCode,
      currency: currencyCode,
      rate: rate
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to load products. Please try again.',
      error: 'Server error'
    });
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
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    
    console.log('updateProduct called with productId:', productId);
    console.log('updateProduct called with updateData:', updateData);
    
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      console.log('updateProduct: Product not found');
      return res.status(404).json({ message: 'Product not found.' });
    }
    
    console.log('updateProduct: Product updated successfully');
    return res.status(200).json({
      message: 'Product updated successfully.',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// New function to get all countries' data for editing
exports.getAllCountriesData = async (req, res) => {
  try {
    const productId = req.params.id;
    
    console.log('getAllCountriesData called with productId:', productId);
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    // Try to find by productId first, then by _id
    let product = await productModel.findOne({ productId: productId });
    
    if (!product) {
      console.log('Product not found by productId, trying _id...');
      // If not found by productId, try by _id
      product = await productModel.findById(productId);
    }
    
    if (!product) {
      console.log('Product not found by either productId or _id');
      return res.status(404).json({ message: 'Product not found.' });
    }

    console.log('Product found:', {
      productId: product.productId,
      _id: product._id,
      hasAliData: !!product.ali_data
    });

    if (!product.ali_data) {
      return res.status(404).json({ message: 'No AliExpress data found for this product.' });
    }

    return res.status(200).json({
      message: 'All countries data fetched successfully.',
      data: {
        productId: product.productId,
        _id: product._id,
        ali_data: product.ali_data
      }
    });
  } catch (error) {
    console.error('Error fetching all countries data:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// New function to update all countries' data at once
exports.updateAllCountriesData = async (req, res) => {
  try {
    const productId = req.params.id;
    const { ali_data } = req.body;
    
    console.log('updateAllCountriesData called with productId:', productId);
    console.log('updateAllCountriesData called with ali_data keys:', ali_data ? Object.keys(ali_data) : 'No ali_data');
    
    // Try to find by productId first, then by _id
    let product = await productModel.findOne({ productId: productId });
    
    if (!product) {
      console.log('updateAllCountriesData: Product not found by productId, trying _id...');
      product = await productModel.findById(productId);
    }
    
    if (!product) {
      console.log('updateAllCountriesData: Product not found by either method');
      return res.status(404).json({ message: 'Product not found.' });
    }
    
    console.log('updateAllCountriesData: Product found, updating ali_data');
    
    // Update the ali_data field
    product.ali_data = ali_data;
    await product.save();
    
    console.log('updateAllCountriesData: Product updated successfully');
    return res.status(200).json({
      message: 'All countries data updated successfully.',
      data: product
    });
  } catch (error) {
    console.error('Error updating all countries data:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// New function to refresh all countries' data from AliExpress API
exports.refreshAllCountriesData = async (req, res) => {
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

    // Try to find by productId first, then by _id
    let product = await productModel.findOne({ productId: productId });
    
    if (!product) {
      // If not found by productId, try by _id
      product = await productModel.findById(productId);
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update existing product with fresh data
    const updatedProduct = await productModel.findByIdAndUpdate(
      product._id,
      { ali_data: aliData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.status(200).json({
      message: 'All countries data refreshed successfully.',
      data: {
        productId: updatedProduct.productId,
        _id: updatedProduct._id,
        ali_data: updatedProduct.ali_data
      }
    });

  } catch (error) {
    console.error('AliExpress Refresh Error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to refresh AliExpress data.', error: error });
  }
};