const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../../database");
const SnippetJavaScript = require("../../../database/models/SnippetJavaScript");
const User = require("../../../database/models/User");
const app = require("../../index");

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

describe("Given a /javascript endpoint", () => {
  describe("When it receives a get petition", () => {
    test("Then it should reply with a random javaScript object", async () => {
      const { body } = await request(app).get("/javascript");

      expect(body).toHaveProperty("language");
    });
  });
});

describe("Given a /javascript/create", () => {
  describe("When it receives a post petition with a code snipped", () => {
    test("Then it should asnwer with the new user state", async () => {
      const codesnippet = {
        language: "JavaScript",
        textCode: `const startServer = (app, port) =>\r\n  new Promise((resolve, reject) => {\r\n    const server = app.listen(port, () => {\r\n      debugs up in http://localhost:$");\r\n      resolve();\r\n    });\r\n\r\n    server.on("error", (error) => {\r\n      debug("Oh no the server couldnt start"`,
        title: "snippet express",
      };
      const { body } = await request(app)
        .post("/javascript/create")
        .set("Authorization", `Bearer ${token}`)
        .send(codesnippet)
        .expect(201);

      expect(body.snippetsJavaScript).toHaveLength(2);
    });
  });
});

describe("Given a /javascript/edit endpoint", () => {
  describe("When it receives a patch petition with an edition object", () => {
    test("Then it should reply with the userState", async () => {
      const editionObject = {
        snippetId: idSnippetCreated,
        updatedProperty: { title: "i am a new title" },
      };
      const { body } = await request(app)
        .patch("/javascript/edit")
        .set("Authorization", `Bearer ${token}`)
        .send(editionObject);

      expect(body.title).toBe(editionObject.updatedProperty.title);
    });
  });
});

describe("Given a /javascript/delete endpoint", () => {
  describe("When it receives a delete petition with a token and an id", () => {
    test("Then it should return the newUserState", async () => {
      const deleteObject = {
        snippetId: idSnippetCreated,
      };
      const { body } = await request(app)
        .delete("/javascript/delete")
        .set("Authorization", `Bearer ${token}`)
        .send(deleteObject);

      expect(body.snippetsJavaScript).toHaveLength(0);
    });
  });
});

describe("Given a /javascript/delete endpoint", () => {
  describe("When it receives a delete petition with a token and an id", () => {
    test("Then it should return the newUserState", async () => {
      const deleteObject = {
        snippetId: "",
      };
      const { body } = await request(app)
        .delete("/javascript/delete")
        .set("Authorization", `Bearer ${token}`)
        .send(deleteObject);

      expect(body.message).toBe(
        'Cast to ObjectId failed for value "" (type string) at path "snippetsJavaScript"'
      );
    });
  });
});
