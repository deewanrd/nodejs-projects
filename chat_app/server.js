const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatModel = require('./models/ChatModel');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

const port = 8000;
app.listen(port, () => {
  console.log("Connected to server");
})