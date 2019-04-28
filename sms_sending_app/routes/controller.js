const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const moment = require('moment');
const messageService = require('../services/message-service');
const MessageModel = require('../models/Message');

const fileName = path.join(__dirname, '../contacts.json');

exports.readContacts = function (cache) {
  cache.contacts = {};
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(fileName);
    let jsonStream = StreamArray.withParser();
    stream.pipe(jsonStream.input);
    jsonStream.on('data', function ({ key, value }) {
      cache.contacts[value.id] = value;
    }).on('end', function () {
      console.log(`Completed reading file: ${fileName}`);
      resolve();
    }).on('error', function (error) {
      console.error(`Error reading contacts file: ${error}`);
      reject(error);
    })
  });
};

exports.fetchContacts = function (req, res, cache) {
  return res.status(200).send(cache.contacts);
};

exports.fetchContactInfo = function (req, res, cache) {
  let id = req.query.id;
  let contacts = cache.contacts;
  for (let key in contacts) {
    if (key == id) {
      let contact = contacts[key];
      return res.status(200).send(contact);
      break;
    }
  }
};

exports.fectMessages = function (req, res) {
  MessageModel.find({}, function (err, messages) {
    if (err) {
      console.error(`Error fetching messages: ${err}`);
      return res.status(400).send(err);
    }
    messages = JSON.parse(JSON.stringify(messages));
    messages.forEach(function (message) {
      message.otp = Number(message.otp);
      message.sent_at = moment(message.sent_at).format('YYYY-MM-DD HH:mm:ss');
    })
    return res.status(200).send(messages);
  })
}

exports.sendMessage = function (req, res) {
  let callback = function (error, response) {
    if (error) {
      return res.status(400).send(error.message);
    }
    let messageObj = response.messages[0];
    messageObj.text = message;
    messageObj.otp = otp;
    messageObj.recipientName = recipientName;
    exports.saveMessageStats(messageObj);
    return res.status(200).send('Message sent successfully');
  }
  let phone = req.body.phone;
  let message = req.body.message;
  let recipientName = req.body.recipientName;
  let otp = message.substring(message.indexOf(":") + 2);
  messageService.sendMessage(phone, message, callback);
};

exports.saveMessageStats = function (messageObj) {
  let messageDoc = new MessageModel({
    'recipientName': messageObj.recipientName,
    'text': messageObj.text,
    'otp': messageObj.otp,
    'sent_at': new Date()
  });
  messageDoc.save(function (err) {
    if (err) {
      console.error(`Error saving message: ${err}`);
      return;
    }
    console.log(`Message saved in db`);
  });
};