const Joi = require('@hapi/joi');

const commentCreateSchema = Joi.object({
  description: Joi.string().max(1000).trim().required(),
});

module.exports = {
  commentCreateSchema,
};
