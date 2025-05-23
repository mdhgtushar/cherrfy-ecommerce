
const appKey = '510834';
const appSecret = 'FVRr5J6Abj8XK4ANH7Hh7TFNuUWNRvad';
const productDir = path.join(__dirname, 'product');

function getProductList(dir) {
  const products = {};
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      const id = entry.name;
      const infoPath = path.join(dir, id, 'information.json');
      if (fs.existsSync(infoPath)) {
        const info = JSON.parse(fs.readFileSync(infoPath));
        products[id] = info?.ae_item_base_info_dto?.subject || id;
      }
    }
  });
  return products;
}

function getSkuAttr(productId, skuId) {
  const skuFolder = path.join(__dirname, 'product', productId, skuId);
  const pattern = `information-${productId}-${skuId}.json`;
  const file = fs.readdirSync(skuFolder).find((f) => f === pattern);

  if (file) {
    const data = JSON.parse(fs.readFileSync(path.join(skuFolder, file)));
    if (data.sku_attr) return data.sku_attr;

    const props = data?.ae_sku_property_dtos?.ae_sku_property_d_t_o || [];
    return props.map((p) => `${p.sku_property_id}:${p.sku_property_value_id}`).join(';');
  }
  return '';
}

app.get('/api/products', (req, res) => {
  const products = getProductList(productDir);
  res.json(products);
});

app.post('/api/order', async (req, res) => {
  const {
    product_id,
    sku_id,
    address,
    city,
    province,
    country,
    zip,
    full_name,
    mobile_no,
    phone_country,
    logistics_service_name
  } = req.body;

  const tokenData = JSON.parse(fs.readFileSync(path.join(__dirname, 'aliexpress_token.json')));
  const accessToken = tokenData.access_token;
  if (!accessToken) return res.status(400).json({ error: 'Access token missing' });

  const skuAttr = getSkuAttr(product_id, sku_id);
  if (!skuAttr) return res.status(400).json({ error: 'SKU attributes not found' });

  const timestamp = Date.now();
  const paramJson = JSON.stringify({
    out_order_id: `ORDER_${Date.now()}`,
    logistics_address: {
      address, city, province, country, zip, full_name,
      mobile_no, phone_country, contact_person: full_name
    },
    product_items: [{
      product_id: parseInt(product_id),
      product_count: 1,
      sku_attr: skuAttr,
      logistics_service_name
    }]
  });

  const params = {
    method: 'aliexpress.ds.order.create',
    app_key: appKey,
    access_token: accessToken,
    timestamp,
    sign_method: 'sha256',
    param_place_order_request4_open_api_d_t_o: paramJson
  };

  const sorted = Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {});

  const signStr = Object.entries(sorted).map(([k, v]) => `${k}${v}`).join('');
  const sign = crypto.createHmac('sha256', appSecret).update(signStr).digest('hex').toUpperCase();
  delete params.param_place_order_request4_open_api_d_t_o;

  const query = new URLSearchParams({ ...params, sign }).toString();
  const url = `https://api-sg.aliexpress.com/sync?${query}`;

  try {
    const { data } = await axios.post(url, {
      param_place_order_request4_open_api_d_t_o: paramJson
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'API call failed', details: error.message });
  }
});