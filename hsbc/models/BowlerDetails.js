const mongoose = require('mongoose');

let bowlerDetailsSchema = new mongoose.Schema({
  'playerId': {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'PlayerDetails'
  },
  'bowling_economy': String,
  'no_of_balls_bowled': String,
  'no_of_wickets': String,
  'no_of_five_wicket_hauls': String
}, { 'collection': 'bowler_details' });

let BowlerDetailsModel = mongoose.model('BowlerDetails', bowlerDetailsSchema);

module.exports = BowlerDetailsModel;