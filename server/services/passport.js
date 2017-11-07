const passport = require('passport');
const localStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');
const User = require('../models/user');

const localOptions = {
	usernameField: 'email'
};

const localLogin = new localStrategy(localOptions, (email, password, done) => {
	User.findOne({email}, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: extractJwt.fromHeader('authorization'),
	secretOrKey: config.jwtSecret
};

const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);