const passport = require('passport');
const LocalStrategy = require('passport-local');
const { JwtStrategy, ExtractJwt } = require('passport-jwt');

const config = require('../config');
const User = require('../models/user');

const localOptions = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err1, user) => {
    if (err1) {
      return done(err1);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err2, isMatch) => {
      if (err2) {
        return done(err2);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
    return undefined;
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
