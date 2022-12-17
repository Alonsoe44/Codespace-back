const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../../database");
const {
  collectionUserSnippetsController,
} = require("./collectionsControllers");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a createSnippetController", () => {
  describe("When it receives a request with a dangerous payload ", () => {
    test("It should call next method with an error", async () => {
      const nextMock = jest.fn();
      const req = {
        userId: new Error(),
      };
      await collectionUserSnippetsController(req, null, nextMock);

      expect(nextMock).toHaveBeenCalled();
    });
  });
});
