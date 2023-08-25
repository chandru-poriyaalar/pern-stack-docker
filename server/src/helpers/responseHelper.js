const ApplicationErrorConstants = require("../constants/ApplicationErrorConstants");

module.exports = {
  buildResponse: (err, response) => {
    if (err) {
      return {
        code: err.name || null,
        message: err.message || null,
      };
    }
    return {
      data: response,
    };
  },
};
