const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function generateToken(user) {
	const timeStamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timeStamp}, config.jwtSecret)
}

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.status(422).send({err: 'You must provide email and password'});
	}

	User.findOne({email: email}, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({err: 'Email is in use'});
		}

		const user = new User({
			email: email,
			password: password
		});
		user.save(err => {
			if (err) {
				return next(err);
			}

			res.json({token: generateToken(user)});
		});
	});	
}

exports.signin = (req, res, next) => {
	res.send({token: generateToken(req.user)});
}
