const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch(); // You can use `.firefox` or `.webkit` as well
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto('http://localhost:8080/milk_loaded.html', {
    waitUntil: 'load' // Waits until no network activity for 500 ms
  });

  // Get the full HTML of the page
  const html = await page.content();

  // Save the HTML to a file
  const fs = require('fs');
  fs.writeFileSync('savedPage.html', html);

  await browser.close();
})();
