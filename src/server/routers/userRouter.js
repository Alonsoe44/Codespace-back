const userRouter = require("express").Router();
const {
  collectionUserSnippetsController,
} = require("../controllers/user/collectionsControllers");
const { tokenValidator } = require("../middlewares/tokenValidator");

userRouter.get("", tokenValidator, collectionUserSnippetsController);

module.exports = userRouter;
