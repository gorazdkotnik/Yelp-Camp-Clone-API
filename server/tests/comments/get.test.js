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

  expect(response.body.length).toBe(4);
});

test('Should limit comment data', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}/comments?limit=1`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
});

test('Should skip comment data', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}/comments?skip=1`)
    .send()
    .expect(200);

  expect(response.body[0].description).toBe('Comment 2');
});

test('Should sort comment data', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}/comments?sortBy=createdAt:desc`)
    .send()
    .expect(200);

  expect(response.body[0].description).toBe('Comment 4');
});
