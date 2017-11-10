const passport = require('passport');

const Authentication = require('./controllers/authentication');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/api', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });

  app.post('/api/signup', Authentication.signup);
  app.post('/api/signin', requireSignin, Authentication.signin);
};
