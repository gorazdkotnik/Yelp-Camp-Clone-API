const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error('First name must contain only letters');
        }
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error('First name must contain only letters');
        }
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
      unique: true,
      validate(value) {
        if (!validator.isAlphanumeric(value)) {
          throw new Error('Username must contain only alphanumeric characters');
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email address');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
