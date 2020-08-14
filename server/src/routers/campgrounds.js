const express = require('express');
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const sendJsonError = require('../helpers/sendJsonError');
const auth = require('../middleware/auth');
const router = new express.Router();

/**
 * * POST
 * * /campgrounds
 */
router.post('/', auth, async (req, res) => {
  const dataKeys = Object.keys(req.body);
  const allowedKeys = ['title', 'image', 'description', 'price'];
  const isValid = dataKeys.every((dataKey) => allowedKeys.includes(dataKey));

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid data'));
  }

  const campground = new Campground({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await campground.save();
    res.status(201).send(campground);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * GET
 * * /campgrounds
 */
router.get('/', async (req, res) => {
  try {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * GET
 * * /campgrounds/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const campground = await Campground.findOne({ _id: req.params.id });

    if (!campground) {
      return res.status(404).send();
    }

    res.send(campground);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * PATCH
 * * /campgrounds/:id
 */
router.patch('/:id', auth, async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const allowedKeys = ['title', 'image', 'description', 'price'];
  const isValid = updateKeys.every((updateKey) =>
    allowedKeys.includes(updateKey)
  );

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid updates'));
  }

  try {
    const campground = await Campground.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!campground) {
      return res.status(404).send();
    }

    updateKeys.forEach((update) => (campground[update] = req.body[update]));
    await campground.save();
    res.send(campground);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * DELETE
 * * /campgrounds/:id
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const campground = await Campground.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!campground) {
      return res.status(404).send();
    }

    await campground.deleteOne();
    res.send(campground);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

module.exports = router;
