const User = require("../../../database/models/User");

const loadRandomSnippetController =
  (programingLanguageModel) => async (req, res) => {
    const randomJsSnippet = await programingLanguageModel.aggregate([
      {
        $sample: { size: 1 },
      },
    ]);
    res.status(200).json(randomJsSnippet[0]);
  };

const createSnippetController =
  (programingLanguageModel) => async (req, res, next) => {
    try {
      const snippetCreation = await programingLanguageModel.create(req.body);
      let updatedUser;
      switch (programingLanguageModel.modelName) {
        case "SnippetJavaScript":
          updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {
              // eslint-disable-next-line no-underscore-dangle
              $push: { snippetsJavaScript: snippetCreation._id },
            },
            { new: true }
          );
          break;
        case "SnippetTypeScript":
          updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {
              // eslint-disable-next-line no-underscore-dangle
              $push: { snippetsTypeScript: snippetCreation._id },
            },
            { new: true }
          );
          break;
        default:
          updatedUser = {
            message:
              "Holy moly the snippet was created but not added to the user",
          };
      }
      res.status(201).json(updatedUser);
    } catch (error) {
      error.status = 400;
      error.message = "You did a bad request, snippet not created";
      next(error);
    }
  };

const editSnippetController =
  (programingLanguageModel) => async (req, res, next) => {
    try {
      const { snippetId, updatedProperty } = req.body;
      const updatedSnippet = await programingLanguageModel.findByIdAndUpdate(
        snippetId,
        updatedProperty,
        { new: true }
      );
      res.status(200).json(updatedSnippet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  };

const deleteSnippetFromUserCollection =
  (programingLanguageModel) => async (req, res, next) => {
    try {
      const { snippetId } = req.body;
      let updatedUser;
      switch (programingLanguageModel.modelName) {
        case "SnippetJavaScript":
          updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { snippetsJavaScript: snippetId } },
            {
              new: true,
            }
          );
          break;
        case "SnippetTypeScript":
          updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { snippetsTypeScript: snippetId } },
            {
              new: true,
            }
          );
          break;
        default:
          updatedUser = {
            message: "Holy moly we didn't found the user",
          };
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  };

const getSnippetController =
  (programingLanguageModel) => async (req, res, next) => {
    try {
      const { id: snippetId } = req.query;
      const snippet = await programingLanguageModel.findById(snippetId);
      res.status(200).json(snippet);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  };

module.exports = {
  loadRandomSnippetController,
  createSnippetController,
  editSnippetController,
  deleteSnippetFromUserCollection,
  getSnippetController,
};
