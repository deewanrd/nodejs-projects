const express = require('express');
const authRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongodb.dbURI, { 'useNewUrlParser': true }, function (err) {
  if (err) {
    console.error('Error connecting to mongodb: ', err);
  } else {
    console.log("Connected to mongodb");
  }
})

app.set('view engine', 'ejs');

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log("Started listening to port 3000");
});