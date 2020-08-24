const Joi = require('@hapi/joi');

const createCampgroundSchema = Joi.object({
  title: Joi.string()
    .min(4)
    .max(20)
    .pattern(/^[a-zA-Z0-9\s]{4,20}$/)
    .trim()
    .required(),
  image: Joi.string().trim().required(),
  description: Joi.string().min(20).max(2500).trim().required(),
  price: Joi.number().min(1).max(1000).required(),
});

module.exports = {
  createCampgroundSchema,
};
