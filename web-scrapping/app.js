const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./routes/controller');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 'extended': false }));

const port = 8000;

app.get('/fetchReviews', (req, res) => {
  let reviewPageUrl = req.query.reviewPageUrl;
  controller.fetchReviews(req, res, reviewPageUrl)
    .then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      res.status(400).send(err);
    })
});

app.listen(port, (req, res) => {
  console.log(`Started to listen on post: ${port}`);
  console.log(`Select url from browser for which you want to fetch reviews`);
});