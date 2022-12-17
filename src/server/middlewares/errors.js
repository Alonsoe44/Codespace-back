const debug = require("debug")("social-app:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const internalServerError = (err, req, res, next) => {
  debug(`Error: ${err.message}`);
  const errorCode = err.status ?? 500;
  const errorMessage = err.status ? err.message : "General pete";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  internalServerError,
};
