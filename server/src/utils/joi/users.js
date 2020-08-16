const Joi = require('@hapi/joi');

const createUserSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-z]+$/i)
    .required(),
  username: Joi.string().min(4).max(20).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(30).required(),
});

const loginUserSchema = Joi.object({
  username: Joi.string().min(4).max(20).alphanum().required(),
  password: Joi.string().min(10).max(30).required(),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
};
