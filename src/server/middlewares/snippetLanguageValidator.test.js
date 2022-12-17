const snippetLanguageValidator = require("./snippetLanguageValidator");

describe("Given a snippetLanguageValidatorController", () => {
  describe("When it receives a request with a language ", () => {
    test("It should let it pass if the payload match the language", () => {
      const middleware = snippetLanguageValidator("JavaScript");

      const req = {
        body: {
          title: "I am some normal title",
          textCode: "I am some normal textcode",
          language: "JavaScript",
        },
      };
      const nextMock = jest.fn();
      middleware(req, "da", nextMock);

      expect(nextMock).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request with a language ", () => {
    test("It should not let it pass if the payload match the language", () => {
      const middleware = snippetLanguageValidator("JavaScript");

      const req = {
        body: {
          title: "I am some normal title",
          textCode: "I am some normal textcode",
          language: "Strange",
        },
      };
      const nextMock = jest.fn();
      middleware(req, "da", nextMock);

      expect(nextMock).toHaveBeenCalledWith(
        new Error("In this endpoint just create JavaScript snippets")
      );
    });
  });
});
