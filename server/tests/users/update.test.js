const request = require('supertest');
const app = require('../../src/app');
const bcrypt = require('bcryptjs');
const {
  userOneId,
  userOneToken,
  setupDatabase,
  User,
} = require('../fixtures/db');

beforeEach(setupDatabase);
/**
 * * Tests
 * * First Name Field
 */
test('Should not update an user with short first name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'J',
      lastName: 'Doe',
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with long first name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'j'.repeat(31),
      lastName: 'Doe',
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with non alpha first name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John1',
      lastName: 'Doe',
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

/**
 * * Tests
 * * Last Name Field
 */
test('Should not update an user with short last name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'D',
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with long last name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'd'.repeat(31),
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with non alpha last name', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe1',
      username: 'updatedUsername',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.username).not.toBe('updatedUsername');
  expect(response.body).toHaveProperty('error');
});

/**
 * * Tests
 * * Username Field
 */
test('Should not update an user with short username', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'joh',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with long username', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'j'.repeat(21),
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with non alphanumeric username', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'john%&',
      email: 'john@gmail.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

/**
 * * Tests
 * * Email Field
 */
test('Should not update an user with invalid email', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'john',
      email: 'john.com',
      password: 'johnSomething123',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

/**
 * * Tests
 * * Password Field
 */
test('Should not update an user with short password', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'john',
      password: 'p'.repeat(9),
      email: 'john@gmail.com',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

test('Should not update an user with long password', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'John',
      lastName: 'Doe123',
      username: 'john',
      password: 'p'.repeat(31),
      email: 'john@gmail.com',
    })
    .expect(400);

  const user = await User.findOne({ _id: userOneId });
  expect(user.lastName).not.toBe('Doe123');
  expect(response.body).toHaveProperty('error');
});

/**
 * * Tests
 * * Entire User Object
 */
test('Should not update unauthorized user', async () => {
  await request(app)
    .patch('/users/me')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john',
      password: 'JohnDoeSomething123',
      email: 'john@gmail.com',
    })
    .expect(401);
});

test('Should update an user with valid data', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      firstName: 'updatedFirstName',
      lastName: 'updatedLastName',
      username: 'updatedUsername',
      email: 'updated@gmail.com',
      password: 'JohnDoeSomething1235678',
    })
    .expect(200);

  const user = await User.findOne({ _id: userOneId });

  expect(user.firstName).toBe('updatedFirstName');
  expect(user.lastName).toBe('updatedLastName');
  expect(user.username).toBe('updatedUsername');
  expect(user.email).toBe('updated@gmail.com');

  const isMatch = await bcrypt.compare(
    'JohnDoeSomething1235678',
    user.password
  );

  expect(user.password).not.toBe('JohnDoeSomething1235678');
  expect(isMatch).toBeTruthy();
});
