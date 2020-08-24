const request = require('supertest');
const app = require('../../src/app');
const {
  userOneId,
  userOneToken,
  userOne,
  userTwoId,
  userTwoToken,
  userTwo,
  setupDatabase,
} = require('../fixtures/db');
const User = require('../../src/models/user');

beforeEach(setupDatabase);

test('Should read profile of authorized user', async () => {
  const response = await request(app)
    .get('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);

  const user = await User.findOne({ _id: response.body._id });
  expect(user).toBeDefined();
});

test('Should not read profile of unauthorized user', async () => {
  const response = await request(app).get('/users/me').expect(401);
  expect(response.body).toHaveProperty('error');
});
