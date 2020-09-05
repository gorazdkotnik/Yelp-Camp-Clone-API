/**
 * * Modules
 * * Imports
 */
const request = require('supertest');
const app = require('../../src/app');
const {
  setupDatabase,
  User,
  userOneId,
  userOneToken,
  userTwoId,
  userTwoToken,
} = require('../fixtures/db');
const path = require('path');

beforeEach(setupDatabase);

/**
 * * POST
 * * Image
 */
test('Should not upload image if not authenticated', async () => {
  await request(app)
    .post('/users/me/avatar')
    .attach('avatar', path.join(__dirname, '../fixtures/files/profile-pic.jpg'))
    .expect(401);

  const user = await User.findById(userOneId);
  expect(user.avatar).not.toBeDefined();
});

test('Should not upload a word document', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach(
      'avatar',
      path.join(__dirname, '../fixtures/files/sample-doc-file.doc')
    )
    .expect(400);

  const user = await User.findById(userOneId);
  expect(user.avatar).not.toBeDefined();
});

test('Should not upload a large image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach('avatar', path.join(__dirname, '../fixtures/files/fall.jpg'))
    .expect(400);

  const user = await User.findById(userOneId);
  expect(user.avatar).not.toBeDefined();
});

test('Should upload an image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .attach('avatar', path.join(__dirname, '../fixtures/files/profile-pic.jpg'))
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

/**
 * * GET
 * * Image
 */
test('Should not get profile picture from invalid user', async () => {
  await request(app).get(`/users/${userOneId}afasf/avatar`).send().expect(404);
});

test('Should get profile picture from user', async () => {
  await request(app)
    .get(`/users/${userTwoId}/avatar`)
    .send()
    .expect('Content-Type', 'image/png')
    .expect(200);
});

/**
 * * DELETE
 * * Image
 */
test('Should not delete profile picture if not authenticated', async () => {
  await request(app).delete('/users/me/avatar').expect(401);
  const user = await User.findById(userTwoId);
  expect(user.avatar).toBeDefined();
});

test('Should delete profile picture', async () => {
  await request(app)
    .delete('/users/me/avatar')
    .set('Cookie', [`auth_token=${userTwoToken}`])
    .expect(200);

  const user = await User.findById(userTwoId);
  expect(user.avatar).not.toBeDefined();
});
