const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');
const config = require('../../config/app.config');
const Setting = require('../settings/settings.model'); // CommonJS import for consistency

// === CONFIG ===
const appKey = config.appKey;

// === SIGN GENERATOR FUNCTION ===
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
        // === Step 1: Fetch App Secret from DB ===
        const appSecretSetting = await Setting.findOne({ key: 'ali_express_app_secret' });
        if (!appSecretSetting) {
            return res.status(400).json({ message: 'App Secret is required.' });
        }
        const appSecret = appSecretSetting.value;

        // === Step 2: Fetch Access Token from DB ===
        const appAccessTokenSetting = await Setting.findOne({ key: 'ali_express_access_token_sg' });
        if (!appAccessTokenSetting) {
            return res.status(400).json({ message: 'App Access Token is required.' });
        }
        const accessToken = appAccessTokenSetting.value;

        // === Step 3: Input Validation ===
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

        // === Step 4: Prepare API Request ===
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

        // === Step 5: Sign Generation ===
        params.sign = generateSignature(params, appSecret);

        const postData = new URLSearchParams({ ...params });

        // === Step 6: Call AliExpress API ===
        const response = await axios.post('https://api-sg.aliexpress.com/sync', postData, {
            timeout: 15000,
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        });

        const result = response.data?.aliexpress_ds_freight_query_response?.result?.delivery_options;
        const freightData = result || { error: 'No delivery options returned' };

        // === Step 7: Respond to Client ===
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
