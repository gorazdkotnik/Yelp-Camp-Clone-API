/**
 * * Modules
 */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneId,
  userOneToken,
  userOne,
  userTwoId,
  userTwoToken,
  userTwo,
  setupDatabase,
};
