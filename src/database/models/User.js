const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pet: {
    type: String,
    default: "basic",
  },
  membership: {
    type: String,
    default: "basic",
  },
  scoreHistoryWpm: [{ type: Number, default: [] }],
  scoreHistoryAccuracy: [{ Number, default: [] }],
  scoreHistoryPerCharacter: [
    {
      letter: String,
      missed: Number,
      default: [],
    },
  ],
  snippetsJavaScript: [
    { type: Schema.Types.ObjectId, default: [], ref: "SnippetJavaScript" },
  ],
  snippetsPhyton: [{ type: Schema.Types.ObjectId, default: [] }],
  snippetsTypeScript: [
    { type: Schema.Types.ObjectId, default: [], ref: "SnippetTypeScript" },
  ],
  snippetsCsharp: [{ type: Schema.Types.ObjectId, default: [] }],
});

const User = model("User", UserSchema, "Users");

module.exports = User;
