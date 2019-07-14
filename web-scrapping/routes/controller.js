const puppeteer = require('puppeteer');

exports.fetchReviews = function (req, res, reviewPageUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ headless: true, 'userDataDir': './data' });
      const page = await browser.newPage();
      await page.goto(reviewPageUrl);

      let reviewData = await page.evaluate(() => {
        let data = [];
        let items = document.querySelectorAll('div.review');
        items.forEach((item) => {
          let reviewJson = {};
          let reviewRatingOverAll = item.querySelector('div.itemRating').innerText;
          let reviewLeftColumn = item.querySelector('dl.reviewer').innerText.split(/\r?\n/);
          let reviewRightColumn = item.querySelector('div.rightCol').querySelector('p').innerText;
          reviewJson.rating = reviewRatingOverAll;
          reviewJson.name = reviewLeftColumn[2];
          reviewJson.date = reviewLeftColumn[4];
          reviewJson.reviewComment = reviewRightColumn;
          data.push(reviewJson);
        });
        return data;
      })
      browser.close();
      return resolve(reviewData);
    } catch (error) {
      console.error("Error occured while crawling web page: ", error);
      return reject(error);
    }
  })
};