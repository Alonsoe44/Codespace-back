const jsonwebtoken = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = new Error("The token is missing");
    error.status = 401;
    next(error);
  } else {
    try {
      const token = headerAuth.replace("Bearer ", "");
      jsonwebtoken.verify(token, process.env.SECRET);
      // eslint-disable-next-line no-unused-vars
      const { _id } = jsonwebtoken.decode(token, { payload: true });
      req.userId = _id;
      next();
    } catch (error) {
      const myError = new Error("No token");
      error.status = 401;
      next(myError);
    }
  }
};

module.exports = { tokenValidator };
