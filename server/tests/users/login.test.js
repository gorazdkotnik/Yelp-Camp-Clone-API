const request = require('supertest');
const app = require('../../src/app');
const { userOne, setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

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

  expect(userOne.tokens.length).toBe(1);
});
