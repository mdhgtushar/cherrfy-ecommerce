fetch('https://api-sg.aliexpress.com/sync?method=aliexpress.ds.product.get&app_key=510834&access_token=50000101140zfnZXzhWcnqCVodZgFv4Nw1FFFvgvGw1EG3FtRi8Q18207c5aQKm3OAov&timestamp=1747012413952&product_id=1005007784736375&ship_to_country=bd&sign_method=sha256&aliexpress_category_id=200135143&sign=814ADFE21D94A767D882ED5131323CA277B48729C8DDA53C434B0A6A153ACDAC')
  .then(res => res.json())
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(err => {
    console.error('Fetch error:', err);
  });