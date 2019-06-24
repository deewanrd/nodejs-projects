const mongoose = require('mongoose');

let batsmanDetailsSchema = new mongoose.Schema({
  'playerId': {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'PlayerDetails'
  },
  'matches': String,
  'innings_played': String,
  'strike_rate': String,
  'highest_score': String,
  'batting_average': String,
  'no_of_hundreds': String,
  'no_of_fifties': String,
  'no_of_fours': String,
  'no_of_sixes': String
}, { 'collection': 'batsman_details' });

let BatsmanDetailsModel = mongoose.model('BatsmanDetails', batsmanDetailsSchema);

module.exports = BatsmanDetailsModel;