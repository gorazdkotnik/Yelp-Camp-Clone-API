const express = require('express');
const sendJsonError = require('../helpers/sendJsonError');
const User = require('../models/user');
const router = new express.Router();

/**
 * * POST
 * * /users
 */
router.post('/', async (req, res) => {
  const dataKeys = Object.keys(req.body);
  const allowedKeys = [
    'firstName',
    'lastName',
    'username',
    'email',
    'password',
  ];
  const isValid = dataKeys.every((dataKey) => allowedKeys.includes(dataKey));

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid data!'));
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(400)
        .send(sendJsonError('That username is already registered'));
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * GET
 * * /users
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * PATCH
 * * /users/:id
 */
router.patch('/:id', async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const allowedKeys = [
    'firstName',
    'lastName',
    'username',
    'email',
    'password',
  ];
  const isValid = updateKeys.every((updateKey) =>
    allowedKeys.includes(updateKey)
  );

  if (!isValid) {
    return res.status(400).send(sendJsonError('Invalid updates!'));
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    updateKeys.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * DELETE
 * * /users/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

module.exports = router;
