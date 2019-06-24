const fs = require('fs');
const csv = require('fast-csv');
const async = require('async');
const PlayerDetailsModel = require('../models/PlayerlDetails');
const BatsmanDetailsModel = require('../models/BatsmanDetails');
const BowlerDetailsModel = require('../models/BowlerDetails');

const fileName = __dirname + '/HSBC_Cricket4f525a3.csv';

exports.queueMessageProcessor = function (data, callback) {
  let player = new PlayerDetailsModel({
    'name': data['Name'],
    'value': data['Player Value USD'],
    'team': data['Team'],
    'nationality': data['Nationality'],
    'role': {
      'batsman': data['Is batsman'] == '1' ? true : false,
      'bowler': data['Is bowler?'] == '1' ? true : false,
      'captain': data['Is Captain(1=yes)'] == '1' ? true : false,
      'wicketkeeper': data['Is Wktkeeper(1=Yes'] == '1' ? true : false
    }
  });

  let batsman = new BatsmanDetailsModel({
    'playerId': player._id,
    'matches': data['Matches'],
    'innings_played': data['Innings played'],
    'strike_rate': data['Strike rate'],
    'highest_score': data['Highest score'],
    'batting_average': data['Batting avg'],
    'no_of_hundreds': data['100 runs made'],
    'no_of_fifties': data['50 runs made'],
    'no_of_fours': data['4s'],
    'no_of_sixes': data['6s']
  });

  let bowler = BowlerDetailsModel({
    'playerId': player._id,
    'bowling_economy': data['Bowling econ'],
    'no_of_balls_bowled': data['Number of balls bowled'],
    'no_of_wickets': data['Wkts taken'],
    'no_of_five_wicket_hauls': data['5 Wicket hauls']
  });

  player.save(function (err) {
    if (err) {
      console.error(`Error saving player details: ${err}`);
    }
  });

  batsman.save(function (err) {
    if (err) {
      console.error(`Error saving batsman details: ${err}`);
    }
  });

  bowler.save(function (err) {
    if (err) {
      console.error(`Error saving bowler details: ${err}`);
    }
    callback();
  })
}

const queue = async.queue(exports.queueMessageProcessor, 2);

exports.readFromCsvFileAndSaveToMongo = function () {
  return new Promise((resolve, reject) => {
    resolve();
    let stream = fs.createReadStream(fileName);
    csv.parseStream(stream, { 'headers': true })
      .on('data', function (data) {
        queue.push(data);
      })
      .on('error', function (error) {
        console.error(`Error while reading data: ${error}`);
      })
      .on('end', function () {
        console.log(`Completed importing contacts from csv file`);
        resolve();
      })
  })
}