const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/google', passport.authenticate('google', {
  'scope': ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

router.get('/facebook', passport.authenticate('facebook',
  {
    scope: ['user_friends', 'manage_pages']
  }));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile');
});

router.get('/github', passport.authenticate('github', {
  'scope': ['user:email']
}));

router.get('/github/redirect', passport.authenticate('github'), function (req, res) {
  res.redirect('/profile');
});

module.exports = router;
