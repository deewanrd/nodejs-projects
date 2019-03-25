const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.send('Logging out');
})

router.get('/google', passport.authenticate('google', {
  'scope': ['profile']
}), (req, res) => {
  res.send('logging in with google');
});

router.get('/google/redirect', (req, res) => {
  res.send('Reached callback URI');
});

module.exports = router;
