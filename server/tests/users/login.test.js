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

/**
 * * Tests
 * * Username Field
 */
test('Should not login an user without an username', async () => {
  await request(app)
    .post('/users/login')
    .send({
      password: userOne.password,
    })
    .expect(400);
});

test('Should not login an user with short username', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: 'joh',
      password: userOne.password,
    })
    .expect(400);
});

test('Should not login an user with long username', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: 'j'.repeat(21),
      password: userOne.password,
    })
    .expect(400);
});

test('Should not login an user with non alphanumeric username', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: 'johndoe$',
      password: userOne.password,
    })
    .expect(400);
});

/**
 * * Tests
 * * Password Field
 */
test('Should not login an user without a password', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: userOne.username,
    })
    .expect(400);
});

test('Should not login an user with short password', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: userOne.username,
      password: 'Something',
    })
    .expect(400);
});

test('Should not login an user with long password', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: userOne.username,
      password: 'j'.repeat(31),
    })
    .expect(400);
});

/**
 * * Tests
 * * Entire User Object
 */
test('Should not login an user without data', async () => {
  await request(app).post('/users/login').send().expect(400);
});

test('Should not login an non existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: 'gorazdk',
      password: 'SomethingNew123',
    })
    .expect(400);
});

test('Should not login an user with wrong password', async () => {
  await request(app)
    .post('/users/login')
    .send({
      username: userOne.username,
      password: 'wrongpassword',
    })
    .expect(400);
});
