require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "444624699992-6j9qum8qhkajkclj2tc3nnifs0o88gqh.apps.googleusercontent.com"
);
const User = require("../../../database/models/User");

const secret = process.env.SECRET;

const loginController = async (req, res, next) => {
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials");
    loginError.status = 401;
    next(loginError);
  };
  const { username, password } = req.body;
  const userFounded = await User.findOne({ username });
  if (userFounded) {
    const passwordMatch = await bcrypt.compare(password, userFounded.password);
    if (passwordMatch) {
      const payloadUser = {
        name: userFounded.name,
        lastname: userFounded.lastName,
        username: userFounded.username,
        // eslint-disable-next-line no-underscore-dangle
        _id: userFounded._id,
      };
      const token = jwt.sign(payloadUser, secret);
      res.status(200).json({ token });
    } else {
      loginErrorProtocol();
    }
  } else {
    loginErrorProtocol();
  }
};

const loginRegisterGoogleController = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const userFounded = await User.findOne({ username: payload.sub });
      if (userFounded) {
        const payloadUser = {
          name: userFounded.name,
          lastname: userFounded.lastName,
          username: userFounded.username,
          // eslint-disable-next-line no-underscore-dangle
          _id: userFounded._id,
        };
        const tokenJWT = jwt.sign(payloadUser, secret);
        res.status(200).json({ tokenJWT });
      } else {
        const userid = payload.sub;

        const newUser = {
          name: payload.given_name,
          lastname: payload.family_name,
          username: userid,
          email: payload.email,
          password: "none",
        };

        const createdUser = await User.create(newUser);

        const payloadUser = {
          name: createdUser.name,
          lastname: createdUser.lastname,
          username: createdUser.username,
          // eslint-disable-next-line no-underscore-dangle
          _id: createdUser._id,
        };

        const tokenJWT = await jwt.sign(payloadUser, secret);
        res.json({ tokenJWT });
      }
    } catch (error) {
      error.status = 401;
      error.message = "HOly moly that token it's invalid or its caduced";
      next(error);
    }
  } else {
    const error = new Error("There's no token here");
    error.status = 401;
    next(error);
  }
};

const registerController = async (req, res, next) => {
  const { name, username, password, lastname, email } = req.body;
  const repitedUser = await User.findOne({ username });
  const repitedEmail = await User.findOne({ email });

  if (repitedEmail) {
    const error = new Error("The email it's already in use");
    error.status = 400;
    next(error);
  } else if (repitedUser) {
    const error = new Error("The username isn't avaliable");
    error.status = 400;
    next(error);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      lastname,
      username,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);
    const payloadUser = {
      name: createdUser.name,
      lastname: createdUser.lastname,
      username: createdUser.username,
      // eslint-disable-next-line no-underscore-dangle
      _id: createdUser._id,
    };

    const token = await jwt.sign(payloadUser, secret);
    res.json({ token });
  }
};
module.exports = {
  loginController,
  registerController,
  loginRegisterGoogleController,
};
