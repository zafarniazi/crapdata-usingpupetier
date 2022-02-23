const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://sfbay.craigslist.org/search/sof");
  let html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  $(".result-title").each((a, b) => {
    // console.log($(b).text());
    const title = $(b).text();
    fs.appendFile("craigslist.txt", title + "\n", (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}
main();
