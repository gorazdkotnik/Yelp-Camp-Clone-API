const express = require('express');
const Comment = require('../models/comment');
const Campground = require('../models/campground');
const sendJsonError = require('../helpers/sendJsonError');
const auth = require('../middleware/auth');
const router = new express.Router({ mergeParams: true });

/**
 * * POST
 * * /campgrounds/:id/comments
 */
router.post('/', auth, async (req, res) => {
  const dataKeys = Object.keys(req.body);
  const allowedKeys = ['description'];
  const isValid = dataKeys.every((dataKey) => allowedKeys.includes(dataKey));

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid data'));
  }

  try {
    const campground = await Campground.findOne({ _id: req.params.id });

    if (!campground) {
      return res.status(404).send();
    }

    const comment = new Comment({
      ...req.body,
      campground: campground._id,
      owner: req.user._id,
    });

    await comment.save();
    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * GET
 * * /campgrounds/:id/comments
 */
router.get('/', async (req, res) => {
  try {
    const campground = await Campground.findOne({ _id: req.params.id });

    if (!campground) {
      return res.status(404).send();
    }

    await campground.populate('comments').execPopulate();
    res.send(campground.comments);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * PATCH
 * * /campgrounds/:id/comments/:comment_id
 */
router.patch('/:comment_id', auth, async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const allowedKeys = ['description'];
  const isValid = updateKeys.every((updateKey) =>
    allowedKeys.includes(updateKey)
  );

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid updates'));
  }

  try {
    const campground = await Campground.findOne({ _id: req.params.id });

    if (!campground) {
      return res.status(404).send();
    }

    const comment = await Comment.findOne({
      campground: req.params.id,
      _id: req.params.comment_id,
      owner: req.user._id,
    });

    if (!comment) {
      return res.status(404).send();
    }

    updateKeys.every((update) => (comment[update] = req.body[update]));
    await comment.save();
    res.send(comment);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * DELETE
 * * /campgrounds/:id/comments/:comment_id
 */
router.delete('/:comment_id', auth, async (req, res) => {
  try {
    const campground = await Campground.findOne({ _id: req.params.id });

    if (!campground) {
      return res.status(404).send();
    }

    const comment = await Comment.findOne({
      campground: req.params.id,
      _id: req.params.comment_id,
      owner: req.user._id,
    });

    if (!comment) {
      return res.status(404).send();
    }

    await comment.deleteOne();
    res.send(comment);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

module.exports = router;
