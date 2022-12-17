const { Joi } = require("express-validation");

const joiSnippet = {
  body: Joi.object({
    language: Joi.string().required(),
    textCode: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

module.exports = joiSnippet;
