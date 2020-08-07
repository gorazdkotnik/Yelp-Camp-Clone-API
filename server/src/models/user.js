const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
