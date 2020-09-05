/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const {
  setupDatabase,
  userOneToken,
  userTwoToken,
  campgroundOneId,
  Campground,
} = require('../fixtures/db');

beforeEach(setupDatabase);

/**
 * * Tests
 * * Authorization
 */
test("Should not update with other user's token", async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userTwoToken}`])
    .send()
    .expect(404);
});

/**
 * * Tests
 * * Title Field
 */
test('Should not update title with short title', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'aaa',
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.title).not.toBe('aaa');
});

test('Should not update title with long title', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'a'.repeat(21),
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.title).not.toBe('a'.repeat(21));
});

test('Should not update title with long title', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'a'.repeat(21),
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.title).not.toBe('a'.repeat(21));
});

test('Should not update title with non alphanumeric title', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid $/',
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.title).not.toBe('Invalid $/');
});

/**
 * * Tests
 * * Description Field
 */
test('Should not update description with short description', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      description: 'a'.repeat(10),
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.description).not.toBe('a'.repeat(10));
});

test('Should not update description with long description', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      description: 'a'.repeat(2501),
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.description).not.toBe('a'.repeat(2501));
});

/**
 * * Tests
 * * Price Field
 */
test('Should not update price with invalid price', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      price: 'abc',
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.price).not.toBe('abc');
});

test('Should not update price with low price', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      price: '0.9',
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.price).not.toBe(0.9);
});

test('Should not update price with high price', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      price: 1002,
    })
    .expect(400);

  const campground = await Campground.findOne({ _id: campgroundOneId });
  expect(campground.price).not.toBe(1002);
});
