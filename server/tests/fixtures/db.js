/**
 * * Modules
 */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
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
  avatar: crypto.randomBytes(64),
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
  title: 'Campground 1',
  description: 'This is description for Campground 1',
  price: '9.00',
  _id: campgroundOneId,
  owner: userOneId,
};

const campgroundTwoId = new mongoose.Types.ObjectId();
const campgroundTwo = {
  title: 'Campground 2',
  description: 'This is description for Campground 2',
  price: '9.00',
  _id: campgroundTwoId,
  owner: userOneId,
  image: crypto.randomBytes(64),
};

const campgroundThreeId = new mongoose.Types.ObjectId();
const campgroundThree = {
  title: 'Campground 3',
  description: 'This is description for Campground 3',
  price: '9.00',
  _id: campgroundThreeId,
  owner: userOneId,
};

const campgroundFourId = new mongoose.Types.ObjectId();
const campgroundFour = {
  title: 'Campground 4',
  description: 'This is description for Campground 4',
  price: '9.00',
  _id: campgroundFourId,
  owner: userOneId,
};

/**
 * * Comments
 */
const commentOneId = new mongoose.Types.ObjectId();
const commentOne = {
  description: 'Comment 1',
  campground: campgroundOneId,
  _id: commentOneId,
  owner: userOneId,
};

const commentTwoId = new mongoose.Types.ObjectId();
const commentTwo = {
  description: 'Comment 2',
  campground: campgroundOneId,
  _id: commentTwoId,
  owner: userOneId,
};

const commentThreeId = new mongoose.Types.ObjectId();
const commentThree = {
  description: 'Comment 3',
  campground: campgroundOneId,
  _id: commentThreeId,
  owner: userOneId,
};

const commentFourId = new mongoose.Types.ObjectId();
const commentFour = {
  description: 'Comment 4',
  campground: campgroundOneId,
  _id: commentFourId,
  owner: userOneId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Campground.deleteMany();
  await Comment.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();

  await new Campground(campgroundOne).save();
  await new Campground(campgroundTwo).save();
  await new Campground(campgroundThree).save();
  await new Campground(campgroundFour).save();

  await new Comment(commentOne).save();
  await new Comment(commentTwo).save();
  await new Comment(commentThree).save();
  await new Comment(commentFour).save();
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
  campgroundTwoId,
  commentOneId,
  setupDatabase,
};
