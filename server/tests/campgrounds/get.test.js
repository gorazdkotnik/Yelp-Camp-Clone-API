/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const { setupDatabase } = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should get all campgrounds', async () => {
  const response = await request(app).get('/campgrounds').send().expect(200);
  expect(response.body).toEqual(expect.any(Array));
});

test('Should limit campground data', async () => {
  const response = await request(app)
    .get('/campgrounds?limit=2')
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test('Should skip campground data', async () => {
  const response = await request(app)
    .get('/campgrounds?skip=2')
    .send()
    .expect(200);

  expect(response.body[0].title).toBe('Campground 3');
});

test('Should match a title', async () => {
  const response = await request(app)
    .get('/campgrounds?title=Campground 1')
    .send()
    .expect(200);

  expect(response.body.length).toBe(1);
  expect(response.body[0].title).toBe('Campground 1');
});

test('Should sort campgrounds', async () => {
  const response = await request(app)
    .get('/campgrounds?sortBy=createdAt:desc')
    .send()
    .expect(200);

  expect(response.body[0].title).toEqual('Campground 4');
});
