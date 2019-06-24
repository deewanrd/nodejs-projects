const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./utils/constants');
const controller = require('./routes/controller');

const port = constants.PORT;

//Instance of express server
const app = express();

//connecting to mongodb hosted on remote server
mongoose.connect(constants.MONGO_URL, { 'useNewUrlParser': true }, function (err, result) {
  if (err) {
    console.error(`Error connecting to mongo db: ${err}`);
    return;
  }
  console.log(`Connected to mongo db!`);
});

const API_KEY = constants.API_KEY;

//middleware to check if incoming requests have valid API in their headers or not.
function checkForValidAPI(req, res, next) {
  if (req.headers.apikey === API_KEY) {
    next();
  } else {
    return res.status(400).send('Invalid API credentials');
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

app.use(express.static(__dirname + '/public'));

/*
All the different API's are handled here. They pass through a middleware checking if they have 
valid API key in their headers.
*/

app.get('/getSuggestionsForPlayerName', checkForValidAPI, function (req, res) {
  let playerName = req.query.playerName;
  controller.getSuggestionsForPlayerName(req, res, playerName);
});

app.get('/getPlayerStats', checkForValidAPI, function (req, res) {
  let playerId = req.query.playerId;
  controller.getPlayerStats(req, res, playerId);
});

app.get('/getSuggestionsForTeamName', checkForValidAPI, function (req, res) {
  let teamName = req.query.teamName;
  controller.getSuggestionsForTeamName(req, res, teamName);
});

app.get('/getTeamStats', checkForValidAPI, function (req, res) {
  let teamName = req.query.teamName;
  controller.getTeamStats(req, res, teamName);
});

app.listen(port, (req, res) => {
  console.log(`Started listening on port: ${port}`);
});