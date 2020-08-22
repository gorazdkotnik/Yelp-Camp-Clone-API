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
 * * First Name Field
 */
test('Should not update an user without a first name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with short first name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'J',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with long first name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'j'.repeat(31),
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with non alpha first name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John1',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

/**
 * * Tests
 * * Last Name Field
 */
test('Should not update an user without a last name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with short last name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'D',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with long last name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'd'.repeat(31),
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with non alpha last name', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

/**
 * * Tests
 * * Username Field
 */
test('Should not update an user without an username', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with short username', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'joh',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with long username', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'j'.repeat(21),
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with non alphanumeric username', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'john%&',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

/**
 * * Tests
 * * Email Field
 */
test('Should not update an user without an email', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'johnSomething123',
    })
    .expect(400);
});

test('Should not update an user with invalid email', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      email: 'john.com',
      password: 'johnSomething123',
    })
    .expect(400);
});

/**
 * * Tests
 * * Password Field
 */
test('Should not update an user without a password', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
    })
    .expect(400);
});

test('Should not update an user with short password', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'p'.repeat(9),
      email: 'john@gmail.com',
    })
    .expect(400);
});

test('Should not update an user with long password', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'p'.repeat(31),
      email: 'john@gmail.com',
    })
    .expect(400);
});

/**
 * * Tests
 * * Entire User Object
 */
test('Should not update an user without data', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send()
    .expect(400);
});

test('Should not update unauthorized user', async () => {
  await request(app)
    .patch('/users/me')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'JohnDoeSomething123',
      email: 'john@gmail.com',
    })
    .expect(401);
});

test('Should update an user with valid data', async () => {
  await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'JohnDoeSomething123',
      email: 'john@gmail.com',
    })
    .expect(200);
});
