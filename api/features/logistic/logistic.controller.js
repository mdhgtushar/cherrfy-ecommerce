const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');
const config = require('../../config/app.config');

// === CONFIG ===
const appKey = config.appKey;
const appSecret = config.appSecret;
const accessToken = config.accessToken;




function generateSignature(params, appSecret) {
    const sortedKeys = Object.keys(params).sort();
    let signStr = '';
    for (const key of sortedKeys) {
        const val = params[key];
        if (key !== 'sign' && val !== '') {
            signStr += key + (typeof val === 'object' ? JSON.stringify(val) : val);
        }
    }
    return crypto.createHmac('sha256', appSecret).update(signStr).digest('hex').toUpperCase();
}

// --- Main Controller ---
const freightQuery = async (req, res) => {
    if (req.method !== 'POST') {
        
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { product_id, country, sku_id, quantity, currency = 'USD', language = 'en_US', locale = 'en_US' } = req.body;

        for (const field of ['product_id', 'country', 'sku_id', 'quantity']) {
            if (!req.body[field]) {
                
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        const intQuantity = parseInt(quantity);
        if (isNaN(intQuantity) || intQuantity < 1 || intQuantity > 12) {
            return res.status(400).json({ error: 'Quantity must be between 1 and 12' });
        }

        const queryDeliveryReq = {
            quantity: intQuantity,
            shipToCountry: country,
            productId: Number(product_id),
            selectedSkuId: sku_id,
            language,
            locale,
            currency
        };

        const params = {
            access_token: accessToken,
            app_key: appKey,
            method: 'aliexpress.ds.freight.query',
            sign_method: 'sha256',
            timestamp: Date.now(),
            queryDeliveryReq: JSON.stringify(queryDeliveryReq)
        };

        params.sign = generateSignature(params, appSecret);

        const postData = new URLSearchParams({ ...params });

        const start = Date.now();

        const response = await axios.post('https://api-sg.aliexpress.com/sync', postData, {
            timeout: 15000,
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        });

        const result = response.data?.aliexpress_ds_freight_query_response?.result?.delivery_options;
        const freightData = result || { error: 'No delivery options returned' };

        const end = Date.now();

        res.json({
            product_id,
            country,
            sku_id,
            quantity: intQuantity,
            freight_data: freightData
        });

    } catch (error) {
        console.error('Error in freightQuery:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    freightQuery
};
