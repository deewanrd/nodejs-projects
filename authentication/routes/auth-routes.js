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
}), (req, res) => {
  res.send('logging in with google');
});

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

router.get('/facebook', passport.authenticate('facebook',
  {
    scope: ['user_friends', 'manage_pages']
  }), (req, res) => {
    res.send('Logging in with facebook');
  });

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile');
})



module.exports = router;
