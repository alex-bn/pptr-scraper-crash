const puppeteer = require('puppeteer');
const xlsx = require('xlsx');

async function getPageData(url, page) {
  //TODO
  await page.goto(url);

  const h1 = await page.$eval('.product_main h1', h1 => h1.textContent);
  const price = await page.$eval('.price_color', price => price.textContent);
  const instock = await page.$eval(
    '.instock.availability',
    instock => instock.innerText
  );

  return {
    title: h1,
    price: price,
    instock: instock,
  };
}

async function getLinks() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');
  const links = await page.$$eval('.product_pod .image_container a', allAs =>
    allAs.map(a => a.href)
  );
  await browser.close();
  return links;
}

async function main() {
  const allLinks = await getLinks();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const scrapeData = [];

  for (let link of allLinks) {
    const data = await getPageData(link, page);
    // adding a random number of seconds
    const secondToWait = (Math.floor(Math.random() * 5) + 1) * 1000;
    await page.waitForTimeout(secondToWait);
    scrapeData.push(data);
  }

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(scrapeData);
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, 'books.xlsx');

  await browser.close();
  console.log('Done!');
}

main();
