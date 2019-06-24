const PlayerDetailsModel = require('../models/PlayerlDetails');
const BatsmanDetailsModel = require('../models/BatsmanDetails');
const BowlerDetailsModel = require('../models/BowlerDetails');

// Index based searching to get suggestions for the player name
exports.getSuggestionsForPlayerName = function (req, res, playerName) {
  let playerNameSearchQuery = {
    'name': new RegExp(playerName, 'i')
  };

  PlayerDetailsModel.find(playerNameSearchQuery, 'name', function (err, result) {
    if (err) {
      console.error(`Error findling player names: ${err}`);
      return res.status(400).send('Error fetching names');
    }
    return res.status(200).send(result);
  })
};

//Function gathering both batting and bowling stats for a player
exports.getPlayerStats = function (req, res, playerId) {
  let batsmanStatsQuery = {
    'playerId': playerId
  };
  BatsmanDetailsModel.findOne(batsmanStatsQuery, null, { 'lean': true }, function (err, battingStats) {
    if (err) {
      console.error(`Error finding batting stats: ${err}`);
      return res.status(400).send('Error finding stats');
    }
    delete battingStats._id;
    delete battingStats.__v;
    BowlerDetailsModel.findOne(batsmanStatsQuery, null, { 'lean': true }, function (err, bowlingStats) {
      if (err) {
        console.error(`Error finding bowling stats: ${err}`);
        return res.status(400).send('Error finding stats');
      }
      delete bowlingStats._id;
      delete bowlingStats.__v;
      let stats = {
        'battingStats': battingStats,
        'bowlingStats': bowlingStats
      };
      return res.status(200).send(stats);
    });
  });
};

//Function suggesting possible team names using index based search in mongo
exports.getSuggestionsForTeamName = function (req, res, teamName) {
  let teamNameSearchQuery = {
    'team': new RegExp(teamName, 'i')
  };

  PlayerDetailsModel.find(teamNameSearchQuery, 'team', function (err, results) {
    if (err) {
      console.error(`Error finding team names: ${err}`);
      return res.status(400).send('Error fetching team names');
    }
    let resultSet = [];
    results.forEach((result) => {
      if (!resultSet.includes(result.team)) {
        resultSet.push(result.team);
      }
    });
    return res.status(200).send(resultSet);
  });
};

//Function providing all the details about the team
exports.getTeamStats = function (req, res, teamName) {
  let teamNameSearchQuery = {
    'team': teamName
  };

  PlayerDetailsModel.find(teamNameSearchQuery, null, { 'lean': true }, function (err, teamStats) {
    if (err) {
      console.error(`Error finding team stats: ${err}`);
      return res.status(400).send('Error finding team details');
    }
    return res.status(200).send(teamStats);
  });
};