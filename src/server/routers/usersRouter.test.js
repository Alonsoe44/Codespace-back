const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../database");
const User = require("../../database/models/User");
const app = require("../index");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);
});

beforeEach(async () => {
  User.create({
    name: "emiliano",
    lastname: "polanco",
    username: "emilio",
    email: "emilianopolanco5@gmail.com",
    password: "$2b$10$wu1A2PgtaMPps7h01duPeeJN3wicJ.PjOhzwdWqFagwAn3MhxW9oq",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given and /users/login endpoint", () => {
  describe("When it gets a request with the right credentials", () => {
    test("Then it should reply with a token", async () => {
      const rightCredentials = {
        username: "emilio",
        password: "pass123",
      };

      const {
        body: { token },
      } = await request(app).post("/users/login").send(rightCredentials);

      expect(token).toBeTruthy();
    });
  });
});

describe("Given and /users/login endpoint", () => {
  describe("When it gets a request with the right credentials", () => {
    test("Then it should reply with a token", async () => {
      const rightCredentials = {
        username: "emilio",
        password: "pass1232",
      };

      const {
        body: { message },
      } = await request(app).post("/users/login").send(rightCredentials);

      expect(message).toBe("Wrong credentials");
    });
  });
});

describe("Given an /users/register endpoint", () => {
  describe("when it gets a reques with the right data", () => {
    test("Then it should reply with a token", async () => {
      const rightUserData = {
        name: "emiliano",
        lastname: "polanco",
        username: "anotherEmilio",
        email: "gbaster5@gmail.com",
        password: "pass123",
      };

      const {
        body: { token },
      } = await request(app).post("/users/register").send(rightUserData);

      expect(token).toBeTruthy();
    });
  });
});

describe("Given an /users/register endpoint", () => {
  describe("when it gets a reques with repeated email", () => {
    test("Then it should reply with an error", async () => {
      const rightUserData = {
        name: "emiliano",
        lastname: "polanco",
        username: "anotherEmilio",
        email: "gbaster5@gmail.com",
        password: "pass123",
      };

      await request(app).post("/users/register").send(rightUserData);

      const {
        body: { message },
      } = await request(app).post("/users/register").send(rightUserData);

      expect(message).toBe("The email it's already in use");
    });
  });

  describe("when it gets a reques with repeated username", () => {
    test("Then it should reply with an error", async () => {
      const rightUserData = {
        name: "emiliano",
        lastname: "polanco",
        username: "anotherEmilio",
        email: "gbaster5@gmail.com",
        password: "pass123",
      };

      await request(app).post("/users/register").send(rightUserData);

      const {
        body: { message },
      } = await request(app)
        .post("/users/register")
        .send({ ...rightUserData, email: "pedro@gmail.com" });

      expect(message).toBe("The username isn't avaliable");
    });
  });
});

describe("Given an /users/login-google endpoint", () => {
  describe("when it gets a request with a wrong token", () => {
    test("Then it should reply with a token", async () => {
      const rightUserData = {
        name: "emiliano",
        lastname: "polanco",
        username: "anotherEmilio",
        email: "gbaster5@gmail.com",
        password: "pass123",
      };

      const {
        body: { message },
      } = await request(app).post("/users/login-google").send(rightUserData);

      expect(message).toBe("There's no token here");
    });
  });
});

describe("Given an /users/login-google endpoint", () => {
  describe("when it gets a request with a wrong token", () => {
    test("Then it should reply with an error", async () => {
      const rightUserData = {
        token: "i am a fake token",
      };

      const {
        body: { message },
      } = await request(app).post("/users/login-google").send(rightUserData);

      expect(message).toBe("HOly moly that token it's invalid or its caduced");
    });
  });
});
