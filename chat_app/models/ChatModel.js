const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  'name': String,
  'chat': String
}, { collection: 'chats' });

const chatModel = mongoose.model('Chat', chatSchema);

exports.chatModel = chatModel;

