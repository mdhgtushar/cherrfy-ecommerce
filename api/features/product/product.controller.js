
const axios = require('axios');
const crypto = require('crypto');
const productModel = require('../models/product.model');
const GetAliProductInfo = require('../util/GetAliProductInfo');

exports.getAliExpressProduct = async (req, res) => {
    const  productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }
    // check if productId already exists in the database
    const existingProduct = await productModel.findOne({ productId: productId });
    if (existingProduct) {
        return res.status(409).json({ message: 'Product already exists.' });
    }
   
    
    try {
        const appKey = '510834';
        const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
        const accessToken = '50000100d16Aa7nunrCY4gWGhqcw17bc6efbTiXEfxgKTVcfGPp0HxzEF4xQJ5K5O4Vt';
        const apiUrl = 'https://api-sg.aliexpress.com/sync';
        const method = 'aliexpress.ds.product.get';
        
        const timestamp = Date.now();
        const params = {
            method,
            app_key: appKey,
            access_token: accessToken,
            timestamp,
            product_id: productId,
            ship_to_country: 'bd',
            sign_method: 'sha256',
            aliexpress_category_id: '200135143'
        };

        // Signature generate
        const sortedKeys = Object.keys(params).sort();
        const signString = sortedKeys.map(key => key + params[key]).join('');
        const sign = crypto
            .createHmac('sha256', appSecret)
            .update(signString)
            .digest('hex')
            .toUpperCase();

        params.sign = sign;
        const query = new URLSearchParams(params).toString();

        // Full URL for API call
        const url = `${apiUrl}?${query}`;
        console.log('AliExpress API URL:', url);
      const data = await GetAliProductInfo(url);

        res.status(200).json(data);
        // const response = await axios.get(url);
        // const result = response.data?.aliexpress_ds_product_get_response?.result;

        // if (!result) {
        //     return res.status(404).json({ message: 'No product data found.' });
        // }

        // const savedProduct = new productModel({
        //     productId: productId,
        //     logText: JSON.stringify(result),
        // });
        // await savedProduct.save();
        // if (!savedProduct) {
        //     return res.status(500).json({ message: 'Failed to save product data.' });
        // } else {
        //     res.status(200).json({ product: "saved", result });
        // }


        // const skus = result?.ae_item_sku_info_dtos?.ae_item_sku_info_d_t_o || [];

        // return res.status(200).json({ skus });

    } catch (error) {
        console.error('AliExpress API Error:', error.response?.data || error.message);
        return res.status(500).json({ message: 'Failed to fetch product info.', error: error });
    }
};

exports.createAliExpressProduct = async (req, res) => {
    const  productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }
    // check if productId already exists in the database
    const existingProduct = await productModel.findOne({ productId: productId });
    if (existingProduct) {
        return res.status(409).json({ message: 'Product already exists.' });
    }
   
    
    try {
        const appKey = '510834';
        const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
        const accessToken = '50000100d16Aa7nunrCY4gWGhqcw17bc6efbTiXEfxgKTVcfGPp0HxzEF4xQJ5K5O4Vt';
        const apiUrl = 'https://api-sg.aliexpress.com/sync';
        const method = 'aliexpress.ds.product.get';
        
        const timestamp = Date.now();
        const params = {
            method,
            app_key: appKey,
            access_token: accessToken,
            timestamp,
            product_id: productId,
            ship_to_country: 'bd',
            sign_method: 'sha256',
            aliexpress_category_id: '200135143'
        };

        // Signature generate
        const sortedKeys = Object.keys(params).sort();
        const signString = sortedKeys.map(key => key + params[key]).join('');
        const sign = crypto
            .createHmac('sha256', appSecret)
            .update(signString)
            .digest('hex')
            .toUpperCase();

        params.sign = sign;
        const query = new URLSearchParams(params).toString();

        // Full URL for API call
        const url = `${apiUrl}?${query}`;
        console.log('AliExpress API URL:', url);
      const data = await GetAliProductInfo(url);

        res.status(200).json(data);
        const response = await axios.get(url);
        const result = response.data?.aliexpress_ds_product_get_response?.result;

        if (!result) {
            return res.status(404).json({ message: 'No product data found.' });
        }

        const savedProduct = new productModel({
            productId: productId,
            logText: JSON.stringify(result),
        });
        await savedProduct.save();
        if (!savedProduct) {
            return res.status(500).json({ message: 'Failed to save product data.' });
        } else {
            res.status(200).json({ product: "saved", result });
        }

 
        return res.status(200).json({ message: 'Product created successfully.' });

    } catch (error) {
        console.error('AliExpress API Error:', error.response?.data || error.message);
        return res.status(500).json({ message: 'Failed to fetch product info.', error: error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
}

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