const User = require("../../../database/models/User");

const collectionUserSnippetsController = async (req, res, next) => {
  try {
    const ourUser = await User.findById(req.userId);
    await ourUser.populate("snippetsJavaScript");
    await ourUser.populate("snippetsTypeScript");

    res.status(200).json(ourUser);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

module.exports = { collectionUserSnippetsController };
