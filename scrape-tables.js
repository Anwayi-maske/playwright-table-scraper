const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=16',
    'https://sanand0.github.io/tdsdata/js_table/?seed=17',
    'https://sanand0.github.io/tdsdata/js_table/?seed=18',
    'https://sanand0.github.io/tdsdata/js_table/?seed=19',
    'https://sanand0.github.io/tdsdata/js_table/?seed=20',
    'https://sanand0.github.io/tdsdata/js_table/?seed=21',
    'https://sanand0.github.io/tdsdata/js_table/?seed=22',
    'https://sanand0.github.io/tdsdata/js_table/?seed=23',
    'https://sanand0.github.io/tdsdata/js_table/?seed=24',
    'https://sanand0.github.io/tdsdata/js_table/?seed=25'
  ];
  
  let grandTotal = 0;
  
  for (const url of urls) {
    console.log(`Scraping: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Find all table cells with numbers, extract and sum
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        if (!isNaN(num)) nums.push(num);
      });
      return nums;
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Page sum: ${pageSum}`);
    grandTotal += pageSum;
  }
  
  console.log(`🎉 GRAND TOTAL: ${grandTotal}`);
  await browser.close();
})();
