/**
 * * Modules
 * * Imports
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Campground = require('./campground');
const Comment = require('./comment');

/**
 * * Schema
 * * User
 */
const userSchema = new mongoose.Schema(
  {
    // First Name
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
    // Last Name
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
    // Username
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
    // Email
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
    // Password
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    // Tokens
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
    // Config
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

/**
 * * Virtual Campgrounds Property
 */
userSchema.virtual('campgrounds', {
  ref: 'Campground',
  localField: '_id',
  foreignField: 'owner',
});

/**
 * * Virtual Comments Property
 */
userSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'owner',
});

/**
 * * Hiding private data
 */
userSchema.methods.toJSON = function () {
  // Transform user into object
  const user = this;
  const userObject = user.toObject();

  // Delete private data
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/**
 * * Generate Authentication Token Function
 */
userSchema.methods.generateAuthToken = async function () {
  // Create new token from user's id
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  // Push tokens to user's tokens array and save the user
  user.tokens.push({ token });
  await user.save();

  // Return token
  return token;
};

/**
 * * Find User by Username and Password Fields
 */
userSchema.statics.findByCredentials = async (username, password) => {
  // Find user by username
  const user = await User.findOne({ username });

  // Check if user exists
  if (!user) {
    throw new Error('Unable to login');
  }

  // Compare user's password and provided password
  const isMatch = await bcrypt.compare(password, user.password);

  // Handle wrong password
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  // Return user if password was correct
  return user;
};

/**
 * * Hash Password before saving
 */
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash user's password if it was changed
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // Continue
  next();
});

/**
 * * Delete user's campgrounds before deleting the user
 * * Delete user's comments before deleting the user
 */
userSchema.pre('deleteOne', { document: true }, async function (next) {
  const user = this;
  await Campground.deleteMany({ owner: user._id });
  await Comment.deleteMany({ owner: user._id });
  next();
});

// Model User and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
