const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const controller = require('./routes/controller');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sms_app', { 'useNewUrlParser': true }, function (err) {
  if (err) {
    console.error(`Error connecting to mongodb: ${err}`);;
    return;
  }
  console.log(`Connected to mongodb`);
});

const cache = {};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.use(express.static(__dirname + '/public'));

const promise = controller.readContacts(cache);

app.get('/fetchContacts', (req, res) => {
  controller.fetchContacts(req, res, cache);
});

app.get('/fetchContactInfo', (req, res) => {
  controller.fetchContactInfo(req, res, cache);
});

app.get('/fetchMessages', (req, res) => {
  controller.fectMessages(req, res);
});

app.post('/sendMessage', (req, res) => {
  controller.sendMessage(req, res);
});

const port = process.env.PORT || 8000;

promise.then((resolve) => {
  console.log("Contacts imported from file and stored in cache");
  app.listen(port, (req, res) => {
    console.log(`Started to listen on port: ${port}`);
  });
}).catch((error) => {
  console.error(`Error reading contacts`);
});