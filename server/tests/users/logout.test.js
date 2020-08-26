const request = require('supertest');
const app = require('../../src/app');
const {
  userOneId,
  userOneToken,
  setupDatabase,
  User,
} = require('../fixtures/db');

beforeEach(setupDatabase);

/**
 * * Tests
 * * Logout
 */
test('Should logout authorized user', async () => {
  await request(app)
    .post('/users/logout')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);

  const user = await User.findOne({ _id: userOneId });
  expect(user.tokens.length).toBe(0);
});

test('Should not logout unauthorized user', async () => {
  await request(app).post('/users/logout').expect(401);
});

/**
 * * Tests
 * * Logout All
 */
test('Should logout authorized user', async () => {
  await request(app)
    .post('/users/logoutAll')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);

  const user = await User.findOne({ _id: userOneId });
  expect(user.tokens.length).toBe(0);
});

test('Should not logout unauthorized user', async () => {
  await request(app).post('/users/logoutAll').expect(401);
});
