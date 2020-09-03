/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const { setupDatabase, campgroundOneId } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should get campground by id', async () => {
  const response = await request(app)
    .get(`/campgrounds/${campgroundOneId}`)
    .send()
    .expect(200);

  expect(response.body).toEqual(expect.any(Object));
});

test('Should not get campground with invalid id', async () => {
  await request(app).get('/campgrounds/a141fa').send().expect(500);
});
