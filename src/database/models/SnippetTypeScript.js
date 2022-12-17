const { model } = require("mongoose");
const SnippetSchema = require("./SnippetSchema");

const SnippetTypeScript = model(
  "SnippetTypeScript",
  SnippetSchema,
  "SnippetsTypeScript"
);

module.exports = SnippetTypeScript;
