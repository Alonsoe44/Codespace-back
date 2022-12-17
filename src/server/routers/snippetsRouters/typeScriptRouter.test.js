const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../../database");
const SnippetTypeScript = require("../../../database/models/SnippetTypeScript");
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
  SnippetTypeScript.create({
    language: "TypeScript",
    textCode: "hi hi i am a program",
    title: "amazingsoftware",
  });
  const { body: snippetBoddy } = await request(app).get("/typescript");
  // eslint-disable-next-line no-underscore-dangle
  idSnippetCreated = snippetBoddy._id;
  User.create({
    name: "emiliano",
    lastname: "polanco",
    username: "emilio",
    email: "emilianopolanco5@gmail.com",
    password: "$2b$10$wu1A2PgtaMPps7h01duPeeJN3wicJ.PjOhzwdWqFagwAn3MhxW9oq",
    snippetsTypeScript: [idSnippetCreated],
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

describe("Given a /typescript endpoint", () => {
  describe("When it receives a get petition", () => {
    test("Then it should reply with a random typescript object", async () => {
      const { body } = await request(app).get("/typescript");

      expect(body.language).toBe("TypeScript");
    });
  });
});

describe("Given a /typescript/create", () => {
  describe("When it receives a post petition with a code snipped", () => {
    test("Then it should asnwer with the new User state", async () => {
      const codesnippet = {
        language: "TypeScript",
        textCode: `const startServer = (app, port) =>\r\n  new Promise((resolve, reject) => {\r\n    const server = app.listen(port, () => {\r\n      debugs up in http://localhost:$");\r\n      resolve();\r\n    });\r\n\r\n    server.on("error", (error) => {\r\n      debug("Oh no the server couldnt start"`,
        title: "snippet express",
      };
      const { body } = await request(app)
        .post("/typescript/create")
        .set("Authorization", `Bearer ${token}`)
        .send(codesnippet)
        .expect(201);

      expect(body.snippetsTypeScript).toHaveLength(2);
    });
  });
});

describe("Given a /typescript/edit endpoint", () => {
  describe("When it receives a patch petition with an edition object", () => {
    test("Then it should reply with the userState", async () => {
      const editionObject = {
        snippetId: idSnippetCreated,
        updatedProperty: { title: "i am a new title" },
      };
      const { body } = await request(app)
        .patch("/typescript/edit")
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
        .delete("/typescript/delete")
        .set("Authorization", `Bearer ${token}`)
        .send(deleteObject);

      expect(body.snippetsTypeScript).toHaveLength(0);
    });
  });
});
