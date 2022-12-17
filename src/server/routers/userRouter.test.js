const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../database");
const User = require("../../database/models/User");
const app = require("../index");
const SnippetJavaScript = require("../../database/models/SnippetJavaScript");

let mongoServer;
let token;
let idSnippetCreated;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);
});

beforeEach(async () => {
  SnippetJavaScript.create({
    language: "JavaScript",
    textCode: "hi hi i am a program",
    title: "amazingsoftware",
  });
  const { body: snippetBoddy } = await request(app).get("/javascript");
  // eslint-disable-next-line no-underscore-dangle
  idSnippetCreated = snippetBoddy._id;
  User.create({
    name: "emiliano",
    lastname: "polanco",
    username: "emilio",
    email: "emilianopolanco5@gmail.com",
    password: "$2b$10$wu1A2PgtaMPps7h01duPeeJN3wicJ.PjOhzwdWqFagwAn3MhxW9oq",
    snippetsJavaScript: [idSnippetCreated],
  });

  const rightCredentials = {
    username: "emilio",
    password: "pass123",
  };
  const { body } = await request(app)
    .post("/users/login")
    .send(rightCredentials);
  token = body.token;
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given and /user/snippets endpoint", () => {
  describe("When it gets a request with the right credentials", () => {
    test("Then it should reply with a the user jsCollection", async () => {
      const jsCollection = [
        {
          language: "JavaScript",
          textCode: "hi hi i am a program",
          title: "amazingsoftware",
          __v: 0,
          _id: idSnippetCreated,
        },
      ];

      const { body } = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`);

      expect(body.snippetsJavaScript).toEqual(jsCollection);
    });
  });
});
