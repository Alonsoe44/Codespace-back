const {
  createSnippetController,
  getSnippetController,
} = require("./snippetsControllers");

describe("Given a createSnippetController", () => {
  describe("When it receives a request with a dangerous payload ", () => {
    test("It should call next method with an error", () => {
      const controller = createSnippetController("JavaScript");

      const req = {
        body: {
          title: "I am some normal title",
          textCode: "I am some normal textcode",
          language: "JavaScript",
        },
      };
      const nextMock = jest.fn();
      controller(req, "res", nextMock);

      expect(nextMock).toHaveBeenCalled();
    });
  });
});

describe("Given a getSnippetController", () => {
  describe("When it receives a request with wrong data", () => {
    test("It should call next method with an error", () => {
      const controller = getSnippetController("JavaScript");

      const req = {
        body: {
          title: "I am some normal title",
          textCode: "I am some normal textcode",
          language: "JavaScript",
        },
      };
      const nextMock = jest.fn();
      controller(req, "res", nextMock);

      expect(nextMock).toHaveBeenCalled();
    });
  });

  describe("When it receives a request", () => {
    test("It should call res methods json and status", () => {
      const programingLanguage = {
        findById: jest.fn().mockImplementation(() => ({ dog: "woof" })),
      };
      const controller = getSnippetController(programingLanguage);

      const req = {
        query: {
          title: "I am some normal title",
          textCode: "I am some normal textcode",
          language: "JavaScript",
        },
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      controller(req, res, "dog");

      expect(programingLanguage.findById).toHaveBeenCalled();
    });
  });
});
