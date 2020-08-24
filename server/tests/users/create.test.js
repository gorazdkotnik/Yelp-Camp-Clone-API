/**
 * * Modules
 * * Imports
 */
const request = require('supertest');
const app = require('../../src/app');
const { setupDatabase } = require('../fixtures/db');
const User = require('../../src/models/user');

beforeEach(setupDatabase);

/**
 * * Tests
 * * First Name Field
 */
test('Should not signup an user without a first name', async () => {
  await request(app)
    .post('/users')
    .send({
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with short first name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'J',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with long first name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'j'.repeat(31),
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with non alpha first name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John1',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

/**
 * * Tests
 * * Last Name Field
 */
test('Should not signup an user without a last name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with short last name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'D',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with long last name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'd'.repeat(31),
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with non alpha last name', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'john',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

/**
 * * Tests
 * * Username Field
 */
test('Should not signup an user without an username', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with short username', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'joh',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with long username', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'j'.repeat(21),
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with non alphanumeric username', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'john%&',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with none unique username', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

/**
 * * Tests
 * * Email Field
 */
test('Should not signup an user without an email', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with invalid email', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      email: 'john.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

/**
 * * Tests
 * * Password Field
 */
test('Should not signup an user without a password', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      email: 'john@gmail.com',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with short password', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'p'.repeat(9),
      email: 'john@gmail.com',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with long password', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'p'.repeat(31),
      email: 'john@gmail.com',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

/**
 * * Tests
 * * Entire User Object
 */
test('Should not signup an user without data', async () => {
  await request(app).post('/users').send().expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should not signup an user with invalid keys', async () => {
  await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'JohnDoeSomething123',
      email: 'john@gmail.com',
      something: 'not valid',
    })
    .expect(400);

  const users = await User.find({});
  expect(users.length).toBe(2);
});

test('Should signup an user with valid data', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'JohnDoeSomething123',
      email: 'john@gmail.com',
    })
    .expect(201);

  const user = await User.find({ username: 'john' });
  expect(user).toBeDefined();

  expect(response.body.user).toMatchObject({
    firstName: 'John',
    lastName: 'Doe',
    username: 'john',
    email: 'john@gmail.com',
  });
});
