const { Joi } = require("express-validation");

const joiUser = {
  body: Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = joiUser;
