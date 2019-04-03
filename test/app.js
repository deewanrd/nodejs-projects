const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.use(express.static(__dirname + '/public'));

app.use('/api', jsonServer.router('api.json'));

const port = 8000;
app.listen(port, function () {
  console.log(`Started listening to port: `, port);
})