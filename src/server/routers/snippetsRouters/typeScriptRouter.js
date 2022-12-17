const typeScriptRouter = require("express").Router();

const { validate } = require("express-validation");
const SnippetTypeScript = require("../../../database/models/SnippetTypeScript");
const {
  loadRandomSnippetController,
  createSnippetController,
  editSnippetController,
  deleteSnippetFromUserCollection,
  getSnippetController,
} = require("../../controllers/snippets/snippetsControllers");
const joiSnippet = require("../../middlewares/joySchemas/joySnippetSchema");
const snippetLanguageValidator = require("../../middlewares/snippetLanguageValidator");
const { tokenValidator } = require("../../middlewares/tokenValidator");

typeScriptRouter.get("", loadRandomSnippetController(SnippetTypeScript));
typeScriptRouter.get("/snippet", getSnippetController(SnippetTypeScript));
typeScriptRouter.post(
  "/create",
  tokenValidator,
  validate(joiSnippet),
  snippetLanguageValidator("TypeScript"),
  createSnippetController(SnippetTypeScript)
);
typeScriptRouter.patch(
  "/edit",
  tokenValidator,
  editSnippetController(SnippetTypeScript)
);
typeScriptRouter.delete(
  "/delete",
  tokenValidator,
  deleteSnippetFromUserCollection(SnippetTypeScript)
);
module.exports = typeScriptRouter;
