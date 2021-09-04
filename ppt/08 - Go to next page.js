const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://books.toscrape.com/');

  while (await page.$('.page .next a')) {
    await page.click('.page .next a');
  }
})();
