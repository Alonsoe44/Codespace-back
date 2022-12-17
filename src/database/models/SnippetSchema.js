const { Schema } = require("mongoose");

const SnippetSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  textCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = SnippetSchema;
