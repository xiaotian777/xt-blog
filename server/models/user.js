const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {config} = require('../config/config')

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minLength: 3,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail,
      message: '{value} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, config.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};