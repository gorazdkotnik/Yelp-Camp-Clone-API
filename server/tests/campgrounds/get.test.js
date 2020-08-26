/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const { setupDatabase, userOneToken, Campground } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should get all campgrounds', async () => {
  const response = await request(app).get('/campgrounds').send().expect(200);
  expect(response.body).toEqual(expect.any(Array));
});
