const Joi = require('@hapi/joi');

const commentCreateSchema = Joi.object({
  description: Joi.string().max(1000).required(),
});

module.exports = {
  commentCreateSchema,
};
