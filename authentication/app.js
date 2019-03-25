const express = require('express');
const authRouter = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log("Started listening to port 3000");
});