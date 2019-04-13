const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./routes/controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.use(express.static(__dirname + '/public'));

app.get('/fetchProducts', (req, res) => {
  controller.fetchProducts(req, res);
});

const port = 8000;
app.listen(port, (req, res) => {
  console.log(`Started listening to requests on port: ${port}`);
});