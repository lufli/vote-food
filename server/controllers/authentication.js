const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function generateToken(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.jwtSecret);
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ err: 'You must provide email and password' });
  }

  User.findOne({ email }, (err1, existingUser) => {
    if (err1) {
      return next(err1);
    }

    if (existingUser) {
      return res.status(422).send({ err: 'Email is in use' });
    }

    const user = new User({
      email,
      password,
    });
    user.save((err2) => {
      if (err2) {
        return next(err2);
      }

      return res.json({ token: generateToken(user) });
    });
    return undefined;
  });
  return undefined;
};

exports.signin = (req, res) => {
  res.send({ token: generateToken(req.user) });
};
