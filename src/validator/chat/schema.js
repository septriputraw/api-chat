const Joi = require('joi');

const chatPayloadSchema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports = { chatPayloadSchema };
