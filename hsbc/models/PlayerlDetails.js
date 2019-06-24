const mongoose = require('mongoose');

let playerDetailsSchema = new mongoose.Schema({
  'name': String,
  'value': String,
  'team': String,
  'nationality': String,
  'role': {
    'batsman': Boolean,
    'bowler': Boolean,
    'captain': Boolean,
    'wicketkeeper': Boolean
  }
}, { 'collection': 'player_details' });

let PlayerDetailsModel = mongoose.model('PlayerDetails', playerDetailsSchema);

module.exports = PlayerDetailsModel;