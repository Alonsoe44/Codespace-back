const usersRouter = require("express").Router();
const { validate } = require("express-validation");
const {
  loginController,
  registerController,
  loginRegisterGoogleController,
} = require("../controllers/user/credentialsControllers");
const joiUser = require("../middlewares/joySchemas/joyUserSchema");

usersRouter.post("/login", loginController);
usersRouter.post("/login-google", loginRegisterGoogleController);
usersRouter.post("/register", validate(joiUser), registerController);

module.exports = usersRouter;
