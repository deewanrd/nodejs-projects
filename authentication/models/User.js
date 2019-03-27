const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  'username': String,
  'googleId': Number
});

const User = mongoose.model('user', userSchema);

module.exports = User;