/**
 * * Modules
 * * Imports
 */
const Joi = require('@hapi/joi');

// Create Comment Schema
const commentCreateSchema = Joi.object({
  description: Joi.string().max(1000).trim().required(),
});

// Update Comment Schema
const commentUpdateSchema = Joi.object({
  description: Joi.string().max(1000).trim(),
});

module.exports = {
  commentCreateSchema,
  commentUpdateSchema,
};
