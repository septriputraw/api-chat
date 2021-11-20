/* eslint-disable no-console */
const { chatPayloadSchema } = require('./schema');

const chatValidator = {
  validateChatPayload: (payload) => {
    const validationResult = chatPayloadSchema.validate(payload);
    if (validationResult.error) {
      console.log(validationResult.error.message);
    }
  },
};

module.exports = chatValidator;
