/**
 * * Modules
 * * Imports
 */
const Joi = require('@hapi/joi');

// Create Campground Schema
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

// Update Campground Schema
const updateCampgroundSchema = Joi.object({
  title: Joi.string()
    .min(4)
    .max(20)
    .pattern(/^[a-zA-Z0-9\s]{4,20}$/)
    .trim(),
  image: Joi.string().trim(),
  description: Joi.string().min(20).max(2500).trim(),
  price: Joi.number().min(1).max(1000),
});

/**
 * * Exports
 */
module.exports = {
  createCampgroundSchema,
  updateCampgroundSchema,
};
