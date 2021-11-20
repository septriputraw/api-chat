/* eslint-disable no-console */
const { UserPayloadSchema } = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      console.log(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
