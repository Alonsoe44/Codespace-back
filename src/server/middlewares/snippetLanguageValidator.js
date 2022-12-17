const snippetLanguageValidator = (expectedLanguage) => (req, res, next) => {
  const response = req.body;
  if (response.language === expectedLanguage) {
    next();
  } else {
    const error = new Error(
      `In this endpoint just create ${expectedLanguage} snippets`
    );
    error.status = 400;
    next(error);
  }
};

module.exports = snippetLanguageValidator;
