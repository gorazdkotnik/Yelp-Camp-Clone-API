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
  commentOneId,
  Comment,
} = require('../fixtures/db');

beforeEach(setupDatabase);

test('Should not update comment if not authorized', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}/comments/${commentOneId}`)
    .send({
      description: 'Updated Description',
    })
    .expect(401);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).not.toBe('Updated Description');
});

test('Should not update comment with invalid campground id', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}sss/comments/${commentOneId}`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'Updated Description',
    })
    .expect(400);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).not.toBe('Updated Description');
});

test('Should not update comment with wrong campground id', async () => {
  await request(app)
    .patch(
      `/campgrounds/${campgroundOneId
        .toString()
        .slice(0, -1)}9/comments/${commentOneId}`
    )
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'Updated Description',
    })
    .expect(404);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).not.toBe('Updated Description');
});

test('Should not update comment with invalid comment id', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}/comments/${commentOneId}aaa`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'Updated Description',
    })
    .expect(400);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).not.toBe('Updated Description');
});

test('Should not update comment with wrong comment id', async () => {
  await request(app)
    .patch(
      `/campgrounds/${campgroundOneId}/comments/${commentOneId
        .toString()
        .slice(0, -1)}3`
    )
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'Updated Description',
    })
    .expect(404);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).not.toBe('Updated Description');
});

test('Should update comment', async () => {
  await request(app)
    .patch(`/campgrounds/${campgroundOneId}/comments/${commentOneId}`)
    .set('Cookie', [`auth_token="${userOneToken}"`])
    .send({
      description: 'Updated Description',
    })
    .expect(200);

  const comment = await Comment.findById(commentOneId);
  expect(comment.description).toBe('Updated Description');
});
