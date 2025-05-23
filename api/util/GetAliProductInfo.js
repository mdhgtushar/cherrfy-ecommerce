const puppeteer = require("puppeteer");

async function GetAliProductInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Intercept network requests
  await page.setRequestInterception(true);

  // Allow the request to continue
  page.on("request", (request) => {
    request.continue();
  });

  return new Promise((resolve, reject) => {
    // Capture the response from the specific API URL
    page.on("response", async (response) => {
      if (response.url() === url) {
        try {
          // Parse the response body as JSON
          const jsonData = await response.json();
          await browser.close(); // Close the browser
          if(jsonData.aliexpress_ds_product_get_response.result){
          resolve(jsonData.aliexpress_ds_product_get_response.result); // Return the JSON data
          }else{
            reject("No result found in the response");
          }
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
          await browser.close();
          reject("Failed to parse response");
        }
      }
    });

    // Navigate to the URL that triggers the API request
    page.goto(url).catch((err) => {
      console.error("Error navigating to URL:", err);
      reject("Failed to navigate to URL");
    });
  });
}

module.exports = GetAliProductInfo;
// Example of using the function
// app.get("/", async (req, res) => {
//   const url = "https://api-sg.aliexpress.com/sync?method=aliexpress.ds.product.get&app_key=510834&access_token=50000101140zfnZXzhWcnqCVodZgFv4Nw1FFFvgvGw1EG3FtRi8Q18207c5aQKm3OAov&timestamp=1747012413952&product_id=1005007784736375&ship_to_country=bd&sign_method=sha256&aliexpress_category_id=200135143&sign=814ADFE21D94A767D882ED5131323CA277B48729C8DDA53C434B0A6A153ACDAC";
  
//   try {
//     const data = await GetAliProductInfo(url);
//     res.json(data); // Send the JSON response to the client
//   } catch (error) {
//     res.status(500).json({ error: error }); // Send error message to client
//   }
// });
