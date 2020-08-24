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

beforeEach(setupDatabase);

test('Should not delete unauthorized user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should delete authorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);
});
