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

test('Should not create a comment without description', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/comments`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      campground: campgroundOneId,
      owner: userOneId,
    })
    .expect(400);

  const campground = await Campground.findById(campgroundOneId).populate(
    'comments'
  );
  expect(campground.comments.length).toBe(4);
});

test('Should not create a comment without campground', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}aa/comments`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'This is an awesome place',
    })
    .expect(400);

  const campground = await Campground.findById(campgroundOneId).populate(
    'comments'
  );
  expect(campground.comments.length).toBe(4);
});

test('Should not create a comment without an owner', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/comments`)
    .send({
      description: 'This is an awesome place',
    })
    .expect(401);

  const campground = await Campground.findById(campgroundOneId).populate(
    'comments'
  );
  expect(campground.comments.length).toBe(4);
});

test('Should not create a comment with long description', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/comments`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'a'.repeat(1001),
    })
    .expect(400);

  const campground = await Campground.findById(campgroundOneId).populate(
    'comments'
  );
  expect(campground.comments.length).toBe(4);
});

test('Should create a comment', async () => {
  await request(app)
    .post(`/campgrounds/${campgroundOneId}/comments`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'This is awesome!!!',
    })
    .expect(201);

  const campground = await Campground.findById(campgroundOneId).populate(
    'comments'
  );
  const comment = await Comment.findOne({ description: 'This is awesome!!!' });

  expect(campground.comments.length).toBe(5);
  expect(comment).not.toBeNull();
});
