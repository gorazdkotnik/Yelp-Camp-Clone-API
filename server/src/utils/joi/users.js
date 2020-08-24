const Joi = require('@hapi/joi');

const createUserSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .trim()
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .trim()
    .required(),
  username: Joi.string().min(4).max(20).alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(10).max(30).trim().required(),
});

const loginUserSchema = Joi.object({
  username: Joi.string().min(4).max(20).alphanum().trim().required(),
  password: Joi.string().min(10).max(30).trim().required(),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .trim(),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .trim(),
  username: Joi.string().min(4).max(20).alphanum().trim(),
  email: Joi.string().email().trim(),
  password: Joi.string().min(10).max(30).trim(),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
};
