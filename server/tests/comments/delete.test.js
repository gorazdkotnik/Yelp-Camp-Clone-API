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
  commentOneId,
  Comment,
} = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should not delete comment if not authorized', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}/comments/${commentOneId}`)
    .send()
    .expect(401);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});

test('Should not delete comment with invalid campground id', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}faasf/comments/${commentOneId}`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send()
    .expect(500);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});

test('Should not delete comment with wrong campground id', async () => {
  await request(app)
    .delete(
      `/campgrounds/${campgroundOneId
        .toString()
        .slice(0, -1)}9/comments/${commentOneId}`
    )
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send()
    .expect(404);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});

test('Should not delete comment with invalid comment id', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}/comments/${commentOneId}asfasf`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send()
    .expect(500);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});

test('Should not delete comment with wrong comment id', async () => {
  await request(app)
    .delete(
      `/campgrounds/${campgroundOneId}/comments/${commentOneId
        .toString()
        .slice(0, -1)}3`
    )
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send()
    .expect(404);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});

test('Should delete comment', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}/comments/${commentOneId}`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send()
    .expect(200);

  const comment = await Comment.findById(commentOneId);
  expect(comment).toBeNull();
});

test('Should not delete comment with invalid token', async () => {
  await request(app)
    .delete(`/campgrounds/${campgroundOneId}/comments/${commentOneId}`)
    .set('Cookie', [`auth_token="${userTwoToken}"`])
    .send()
    .expect(404);

  const comment = await Comment.findById(commentOneId);
  expect(comment).not.toBeNull();
});
