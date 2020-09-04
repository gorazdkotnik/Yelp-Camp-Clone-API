/**
 * * Modules
 * * Imports
 */
const express = require('express');
const Campground = require('../models/campground');
const sendJsonError = require('../utils/sendJsonError');
const escapeRegex = require('../utils/fuzzySearch');
const auth = require('../middleware/auth');
const upload = require('../utils/multer/campground');
const sharp = require('sharp');
const router = new express.Router();

const {
  createCampgroundSchema,
  updateCampgroundSchema,
} = require('../utils/joi/campgrounds');

/**
 * * POST
 * * /campgrounds
 */
router.post('/', auth, async (req, res) => {
  try {
    await createCampgroundSchema.validateAsync(req.body);

    const campground = new Campground({
      ...req.body,
      owner: req.user._id,
    });

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
  const match = {};
  const sort = {};

  if (req.query.title) {
    const regex = new RegExp(escapeRegex(req.query.title), 'gi');
    match.title = regex;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const campgrounds = await Campground.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort,
    });

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
  try {
    await updateCampgroundSchema.validateAsync(req.body);
    const updateKeys = Object.keys(req.body);

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

/**
 * * POST
 * * /campgrounds/:id/image
 */
router.post(
  '/:id/image',
  auth,
  upload.single('image'),
  async (req, res) => {
    const campground = await Campground.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!campground) {
      return res.status(404).send();
    }

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800 })
      .png()
      .toBuffer();
    campground.image = buffer;
    await campground.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send(sendJsonError(error.message));
  }
);

/**
 * * GET
 * * /campgrounds/:id/image
 */
router.get('/:id/image', async (req, res) => {
  try {
    const campground = await Campground.findOne({
      _id: req.params.id,
    });

    if (!campground || !campground.image) {
      return res.status(404).send();
    }

    res.set('Content-Type', 'image/png');
    res.send(campground.image);
  } catch (e) {
    res.status(404).send(sendJsonError(e.message));
  }
});

/**
 * * DELETE
 * * /campgrounds/:id/image
 */
router.delete('/:id/image', auth, async (req, res) => {
  try {
    const campground = await Campground.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!campground) {
      return res.status(404).send();
    }

    campground.image = undefined;
    await campground.save();
    res.send();
  } catch (e) {
    res.status(400).send(sendJsonError(e.message));
  }
});

module.exports = router;
