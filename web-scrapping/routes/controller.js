const puppeteer = require('puppeteer');
const REVIEW_TAB_SELECTOR = '#reviewtab > a > span';
const NUMBER_OF_REVIEWS_SELECTOR = "#customerReviews > div:nth-child(1) > dl > dt";

exports.fetchReviews = function (req, res, reviewPageUrl) {
  return new Promise(async (resolve, reject) => {
    let browser = null;
    try {
      browser = await puppeteer.launch({ headless: true, 'userDataDir': './data' });
      const page = await browser.newPage();
      await page.goto(reviewPageUrl);
      await page.click(REVIEW_TAB_SELECTOR);
      await page.waitForSelector(NUMBER_OF_REVIEWS_SELECTOR);

      let noOfReviews = await page.evaluate((selector) => {
        let text = document.querySelector(selector).innerText;
        let textArray = text.split(" ");
        let reviewsCount = textArray[textArray.length - 1].replace('of', '').trim();
        return reviewsCount;
      }, NUMBER_OF_REVIEWS_SELECTOR);

      let totalReviews = parseInt(noOfReviews);
      let totalPages = Math.ceil(totalReviews / 5);

      let currentPage = 1;
      let finalResult = [];

      while (currentPage <= totalPages) {
        let newReviews = await page.evaluate(() => {
          let results = [];
          let items = document.querySelectorAll('div.review');
          items.forEach((item) => {
            let reviewJson = {};
            let reviewRatingOverAll = item.querySelector('div.itemRating').innerText;
            let reviewLeftColumn = item.querySelector('dl.reviewer').innerText.split(/\r?\n/);
            let reviewRightColumn = item.querySelector('div.rightCol').querySelector('p').innerText;
            reviewJson.rating = reviewRatingOverAll;
            reviewJson.name = reviewLeftColumn[1];
            reviewJson.date = reviewLeftColumn[3];
            reviewJson.reviewComment = reviewRightColumn;
            results.push(reviewJson);
          });
          return results;
        });
        finalResult = finalResult.concat(newReviews);
        if (currentPage < totalPages) {
          await Promise.all([
            await page.evaluate(() => {
              debugger;
              document.querySelector("#customerReviews > div:nth-child(1) > dl > dd > a:last-child").click()
            }),
            await page.waitForSelector("#customerReviews > div:nth-child(1) > dl > dt")
          ])
        }
        currentPage++;
      }

      browser.close();
      return resolve(finalResult);
    } catch (error) {
      console.error("Error occured while crawling web page: ", error);
      browser.close();
      return reject(error.message);
    }
  });
};