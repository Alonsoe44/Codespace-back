const { model } = require("mongoose");
const SnippetSchema = require("./SnippetSchema");

const SnippetJavaScript = model(
  "SnippetJavaScript",
  SnippetSchema,
  "SnippetsJavaScript"
);

module.exports = SnippetJavaScript;
