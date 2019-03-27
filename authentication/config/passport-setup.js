const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) {
      console.error('Error fetching profile');
      return done(err, null);
    }
    done(null, user);
  })
})

passport.use(new GoogleStrategy({
  'clientID': keys.google.clientID,
  'clientSecret': keys.google.clientSecret,
  'callbackURL': '/auth/google/redirect'
}, function (accessToken, refreshToken, profile, done) {
  let query = {
    'googleId': profile.id
  };
  User.findOne(query, function (err, existingUser) {
    if (err) {
      console.error('Error finding profile: ', err);
    } else if (existingUser) {
      console.log("User already exists");
      done(null, existingUser);
    } else {
      let user = new User({
        'username': profile.displayName,
        'googleId': profile.id
      });
      user.save()
        .then(function (result) {
          console.log("New user created: ", result);
          done(null, result);
        }).catch(function (err) {
          console.error('Errror saving user');
        })
    }
  })
}))