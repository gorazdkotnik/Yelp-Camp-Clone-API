/**
 * * Modules
 * * Imports
 */
const app = require('../../src/app');
const request = require('supertest');
const { setupDatabase, userOneToken, Campground } = require('../fixtures/db');

beforeEach(setupDatabase);

/**
 * * Tests
 * * Title Field
 */
test('Should not create campground without title', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      image: 'https://image.com',
      description: 'This is description for Campground',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ price: '5.00' });
  expect(campground).toBeNull();
});

test('Should not create campground with short title', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'aaa',
      image: 'https://image.com',
      description: 'This is description for Campground',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ price: '5.00' });
  expect(campground).toBeNull();
});

test('Should not create campground with long title', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'a'.repeat(21),
      image: 'https://image.com',
      description: 'This is description for Campground',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ price: '5.00' });
  expect(campground).toBeNull();
});

test('Should not create campground with non alphanumeric title', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Campground Title$',
      image: 'https://image.com',
      description: 'This is description for Campground',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Campground Title$' });
  expect(campground).toBeNull();
});

/**
 * * Tests
 * * Description Field
 */

test('Should not create campground without description', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Description',
      image: 'https://image.com',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Description' });
  expect(campground).toBeNull();
});

test('Should not create campground with short description', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Description',
      image: 'https://image.com',
      description: 't'.repeat(19),
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Description' });
  expect(campground).toBeNull();
});

test('Should not create campground with long description', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Description',
      image: 'https://image.com',
      description: 't'.repeat(2501),
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Description' });
  expect(campground).toBeNull();
});

/**
 * * Tests
 * * Image Field
 */
test('Should not create campground without an image', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Image',
      description: 't'.repeat(2501),
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Image' });
  expect(campground).toBeNull();
});

test('Should not create campground with invalid image value', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Image',
      description: 't'.repeat(2501),
      image: 'invalid',
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Image' });
  expect(campground).toBeNull();
});

/**
 * * Tests
 * * Price Field
 */
test('Should not create campground without price', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Price',
      image: 'https://image.com',
      description: 'This is a campground description',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Price' });
  expect(campground).toBeNull();
});

test('Should not create campground with invalid type of price', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Price',
      image: 'https://image.com',
      description: 'This is a campground description',
      price: 'abc',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Price' });
  expect(campground).toBeNull();
});

test('Should not create campground with high price', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Price',
      image: 'https://image.com',
      description: 'This is a campground description',
      price: '1000.1',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Price' });
  expect(campground).toBeNull();
});

test('Should not create campground with low price', async () => {
  await request(app)
    .post('/campgrounds')
    .set('Cookie', [`auth_token=${userOneToken}`])
    .send({
      title: 'Invalid Price',
      image: 'https://image.com',
      description: 'This is a campground description',
      price: '0.5',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Price' });
  expect(campground).toBeNull();
});
