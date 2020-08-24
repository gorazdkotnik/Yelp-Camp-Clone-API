const request = require('supertest');
const app = require('../../src/app');
const {
  User,
  Campground,
  Comment,
  userOneId,
  userOneToken,
  userTwoId,
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

  const userOne = await User.findOne({ _id: userOneId });
  const userTwo = await User.findOne({ _id: userTwoId });
  const campgrounds = await Campground.find({ owner: userOneId });
  const comments = await Comment.find({ owner: userOneId });

  expect(userOne).toBeNull();
  expect(userTwo).not.toBeNull();
  expect(campgrounds.length).toBe(0);
  expect(comments.length).toBe(0);
});
