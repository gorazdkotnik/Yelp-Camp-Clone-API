const express = require('express');
const Comment = require('../models/comment');
const Campground = require('../models/campground');
const sendJsonError = require('../helpers/sendJsonError');
const router = new express.Router({ mergeParams: true });

/**
 * * POST
 * * /campgrounds/:id/comments
 */
router.post('/', async (req, res) => {
  const dataKeys = Object.keys(req.body);
  const allowedKeys = ['description'];
  const isValid = dataKeys.every((dataKey) => allowedKeys.includes(dataKey));

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid data!'));
  }

  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
      return res.status(404).send();
    }

    const comment = new Comment({
      ...req.body,
      campground: campground._id,
    });

    await comment.save();
    campground.comments.push(comment);
    await campground.save();

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
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
      return res.status(404).send();
    }

    const comments = await Comment.find({ campground: req.params.id });
    res.send(comments);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * PATCH
 * * /campgrounds/:id/comments/:comment_id
 */
router.patch('/:comment_id', async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const allowedKeys = ['description'];
  const isValid = updateKeys.every((updateKey) =>
    allowedKeys.includes(updateKey)
  );

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid updates!'));
  }

  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground || !campground.comments.includes(req.params.comment_id)) {
      return res.status(404).send();
    }

    const comment = await Comment.findOneAndUpdate(
      { campground: req.params.id, _id: req.params.comment_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!comment) {
      return res.status(404).send();
    }

    res.send(comment);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * DELETE
 * * /campgrounds/:id/comments/:comment_id
 */
router.delete('/:comment_id', async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);

    if (!campground || !campground.comments.includes(req.params.comment_id)) {
      return res.status(404).send();
    }

    const comment = await Comment.findOneAndDelete({
      campground: req.params.id,
      _id: req.params.comment_id,
    });

    if (!comment) {
      return res.status(404).send({ error: 'comment not found' });
    }

    campground.comments = campground.comments.filter(
      (id) => id.toString() !== req.params.comment_id
    );

    await campground.save();
    res.send(comment);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

module.exports = router;
