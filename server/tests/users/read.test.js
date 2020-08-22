const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

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

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should read profile of authorized user', async () => {
  await request(app)
    .get('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);
});

test('Should not read profile of unauthorized user', async () => {
  await request(app).get('/users/me').expect(401);
});
