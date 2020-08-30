/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const {
  setupDatabase,
  userOneId,
  userOneToken,
  campgroundOneId,
  Campground,
  Comment,
} = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should not get comments with invalid campground id', async () => {
  const response = await request(app)
    .get('/campgrounds/wrongId/comments')
    .send()
    .expect(500);

  expect(response.body).toHaveProperty('error');
});

test('Should not get comments with wrong campground id', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId.toString().slice(0, -1)}9/comments`)
    .send()
    .expect(404);

  expect(response.body).toEqual({});
});

test('Should get comments', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}/comments`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});
