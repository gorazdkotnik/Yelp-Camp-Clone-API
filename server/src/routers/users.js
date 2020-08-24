/**
 * * Modules
 * * Imports
 */
const express = require('express');
const sendJsonError = require('../utils/sendJsonError');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require('../utils/joi/users');
const router = new express.Router();

/**
 * * POST
 * * /users
 */
router.post('/', async (req, res) => {
  try {
    await createUserSchema.validateAsync(req.body);

    const newUser = new User(req.body);
    const token = await newUser.generateAuthToken();
    res.cookie('auth_token', token);

    await newUser.save();
    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * POST
 * * /users/login
 */
router.post('/login', async (req, res) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token);

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * POST
 * * /users/logout
 */
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * * POST
 * * /users/logoutAll
 */
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * * GET
 * * /users/me
 */
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

/**
 * * PATCH
 * * /users/me
 */
router.patch('/me', auth, async (req, res) => {
  try {
    await updateUserSchema.validateAsync(req.body);

    const updateKeys = Object.keys(req.body);
    updateKeys.forEach(
      (updateKey) => (req.user[updateKey] = req.body[updateKey])
    );
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(sendJsonError(e.message, e.stack));
  }
});

/**
 * * DELETE
 * * /users/me
 */
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(sendJsonError(e.message, e.stack));
  }
});

module.exports = router;
