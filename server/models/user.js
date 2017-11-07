const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});


userSchema.pre('save', function encryptPassword(next) {
  const user = this;

  bcrypt.genSalt(10, (err1, salt) => {
    if (err1) {
      return next(err1);
    }

    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err2);
      }

      user.password = hash;
      return next();
    });
    return undefined;
  });
  return undefined;
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

const model = mongoose.model('user', userSchema);

module.exports = model;
