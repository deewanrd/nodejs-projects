const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  'recipientName': String,
  'text': String,
  'otp': String,
  'sent_at': Date
});

const MessageModel = mongoose.model('Message', messageSchema);
module.exports = MessageModel;