const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let query = {
    'id': id
  }
  User.findOne(query, function (err, user) {
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
    'id': profile.id
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
        'id': profile.id
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
}));

passport.use(new FacebookStrategy({
  'clientID': keys.facebook.appID,
  'clientSecret': keys.facebook.appSecret,
  'callbackURL': '/auth/facebook/redirect'
}, function (accessToken, refreshToken, profile, done) {
  let query = {
    'id': profile.id
  };
  User.findOne(query).
    then((existingUser) => {
      if (existingUser) {
        console.log("Facebook user already exists");
        done(null, existingUser);
      } else {
        new User({
          'username': profile.displayName,
          'id': profile.id
        }).save(function (err, result) {
          if (err) {
            console.log("Error daving fb user");
            done(err, null);
          } else {
            console.log("FB user saved");
            done(null, result);
          }
        })
      }
    }).catch((err) => {
      console.error("Error finding fb profile");
    })
}))