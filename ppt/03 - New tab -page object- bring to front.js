puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page1 = await browser.newPage();
  await page1.goto('https://books.toscrape.com/');

  const page2 = await browser.newPage();
  await page2.goto(
    'https://books.toscrape.com/catalogue/category/books/crime_51/index.html'
  );

  let tabs = await browser.pages();

  // await tabs[0].bringToFront();
  // await tabs[0].goto(
  //   'https://books.toscrape.com/catalogue/category/books/philosophy_7/index.html'
  // );
  await page1.bringToFront();
  await page1.waitForTimeout(2000);
  let latestTab = tabs[tabs.length - 1];
  await latestTab.bringToFront();

  // for (let t of tabs) {
  //   let title = await t.title();
  //   console.log(title);
  // }
})();
