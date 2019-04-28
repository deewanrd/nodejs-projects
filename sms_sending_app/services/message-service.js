const Nexmo = require('nexmo');
const keys = require('../config/keys');
const nexmo = new Nexmo({
  'apiKey': keys.nexmo.apiKey,
  'apiSecret': keys.nexmo.apiSecret
});

exports.sendMessage = function (phone, message, callback) {
  const from = 'Nexmo';
  const to = phone;
  const text = message;
  nexmo.message.sendSms(from, to, text, function (error, responseData) {
    if (error) {
      console.error(`Error sending message: `, error);
    } else {
      console.log('Message successsully sent');
    }
    callback(error, responseData);
  })
};