const puppeteer = require('puppeteer');
const Downloader = require('./00 - Download a file in Nodejs');
const path = require('path');

const filepath = path.resolve(__dirname, 'images');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // https or http
  await page.goto(
    'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html'
  );
  const imageURL = await page.$eval(
    '.thumbnail .item.active img',
    img => img.src
  );

  Downloader.download(imageURL, filepath, function (filename) {
    console.log(`Download complete for ${filename}!`);
  });
})();
