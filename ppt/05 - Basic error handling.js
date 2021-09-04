const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  try {
    await page.goto('http://example.webdsadscraping.com/', { timeout: 5000 });
  } catch (err) {
    console.log('the page didnt load');
  }

  const page2 = await browser.newPage();
  try {
    await page2.goto('https://google.com');
    await page2.click('#L2AGLb .jyfHyd');
  } catch (err) {
    console.log('the page didnt load');
  }

  ////////////////////////////////////////////////////////////////
  // should be done for all network requests, also any async function should be inside of a try/catch block
})();
