/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const {
  setupDatabase,
  campgroundOneId,
  campgroundTwoId,
  User,
  userOneId,
  userOneToken,
  userTwoId,
  userTwoToken,
  Campground,
} = require('../fixtures/db');
const path = require('path');
const e = require('express');

/**
 * * POST
 * * Image
 */
test('Should not upload an image if not authenticated', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/image`)
    .attach('image', path.join(__dirname, '../fixtures/files/profile-pic.jpg'))
    .expect(401);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground.image).not.toBeDefined();
});

test('Should not upload a word document', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/image`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach(
      'image',
      path.join(__dirname, '../fixtures/files/sample-doc-file.doc')
    )
    .expect(400);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground.image).not.toBeDefined();
});

test('Should not upload a large image', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/image`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach('image', path.join(__dirname, '../fixtures/files/fall.jpg'))
    .expect(400);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground.image).not.toBeDefined();
});

test('Should upload an image', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/image`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach('image', path.join(__dirname, '../fixtures/files/profile-pic.jpg'))
    .expect(200);

  const campground = await Campground.findById(campgroundOneId);
  expect(campground.image).toEqual(expect.any(Buffer));
});

/**
 * * GET
 * * /campgrounds/:id/image
 */
test('Should not get campground image from invalid campground', async () => {
  await request(app).get(`/campgrounds/asfa/image`).expect(404);
});

test('Should get campground image', async () => {
  await request(app)
    .get(`/campgrounds/${campgroundTwoId}/image`)
    .expect('Content-Type', 'image/png')
    .expect(200);
});

/**
 * * DELETE
 * * IMAGE
 */
test('Should not delete campground image if not authenticated', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundTwoId}/image`)
    .expect(401);

  const campground = await Campground.findById(campgroundTwoId);
  expect(campground.image).toEqual(expect.any(Buffer));
});

test('Should delete campground image', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundTwoId}/image`)
    .set('Cookie', [`auth_token=${userOneToken}`])
    .expect(200);

  const campground = await Campground.findById(campgroundTwoId);
  expect(campground.image).not.toBeDefined();
});

beforeEach(setupDatabase);
