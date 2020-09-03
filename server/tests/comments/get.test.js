/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const { setupDatabase, campgroundOneId } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should not get comments with invalid campground id', async () => {
  const response = await request(app)
    .get('/campgrounds/wrongId/comments')
    .send()
    .expect(500);

  expect(response.body).toHaveProperty('error');
});

test('Should get comments', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}/comments`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});
