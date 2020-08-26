/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const {
  setupDatabase,
  campgroundOneId,
  userOneToken,
  userTwoToken,
  Campground,
  Comment,
} = require('../fixtures/db');

beforeEach(setupDatabase);

test("Should not delete campground with other user's token", async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userTwoToken}`])
    .send()
    .expect(404);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground).not.toBeNull();
});

test("Should delete owner's campground", async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send()
    .expect(200);

  const campground = await Campground.findById(campgroundOneId);
  const comments = await Comment.find({ campground: campgroundOneId });
  expect(campground).toBeNull();
  expect(comments.length).toBe(0);
});

test('Should not delete campground with invalid id', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}sdasf11`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send()
    .expect(500);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground).not.toBeNull();
});

test('Should not delete campground with wrong id', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId.toString().slice(0, -1)}1`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send()
    .expect(404);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground).not.toBeNull();
});
