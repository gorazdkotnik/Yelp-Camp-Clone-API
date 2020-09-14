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
      description: 't'.repeat(2501),
      price: '5.00',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Description' });
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
      description: 'This is a campground description',
      price: '0.5',
    })
    .expect(400);

  const campground = await Campground.findOne({ title: 'Invalid Price' });
  expect(campground).toBeNull();
});

// TODO: Add tests for campground image upload
