/**
 * * Modules
 */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Campground = require('../../src/models/campground');
const Comment = require('../../src/models/comment');

/**
 * * User One
 */
const userOneId = new mongoose.Types.ObjectId();
const userOneToken = jwt.sign(
  { _id: userOneId.toString() },
  process.env.JWT_SECRET
);

const userOne = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'john@gmail.com',
  password: 'johnSomething123',
  _id: userOneId,
  tokens: [
    {
      token: userOneToken,
    },
  ],
};

/**
 * * User Two
 */
const userTwoId = new mongoose.Types.ObjectId();
const userTwoToken = jwt.sign(
  { _id: userTwoId.toString() },
  process.env.JWT_SECRET
);

const userTwo = {
  firstName: 'Mike',
  lastName: 'Doe',
  username: 'mikedoe',
  email: 'mike@gmail.com',
  password: 'mikeSomething123',
  _id: userTwoId,
  tokens: [
    {
      token: userTwoToken,
    },
  ],
};

/**
 * * Campgrounds
 */
const campgroundOneId = new mongoose.Types.ObjectId();
const campgroundOne = {
  title: 'Campground 2',
  image: 'https://image.com',
  description: 'This is description for Campground 2',
  price: '9.00',
  _id: campgroundOneId,
  owner: userOneId,
};

/**
 * * Comments
 */
const commentOneId = new mongoose.Types.ObjectId();
const commentOne = {
  description: 'Amazing!',
  campground: campgroundOneId,
  _id: commentOneId,
  owner: userOneId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Campground.deleteMany();
  await Comment.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Campground(campgroundOne).save();
  await new Comment(commentOne).save();
};

module.exports = {
  User,
  Campground,
  Comment,
  userOneId,
  userOneToken,
  userOne,
  userTwoId,
  userTwoToken,
  userTwo,
  campgroundOne,
  campgroundOneId,
  setupDatabase,
};
