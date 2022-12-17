const jsonwebtoken = require("jsonwebtoken");
const { tokenValidator } = require("./tokenValidator");

describe("Given a tokenValidator function", () => {
  describe("When it receives a req with a token in the headers", () => {
    test("Then it should call method next()", async () => {
      const req = {
        header: () => ({ replace: jest.fn().mockResolvedValue(true) }),
      };

      const next = jest.fn();

      jsonwebtoken.verify = jest.fn().mockResolvedValue(true);

      await tokenValidator(req, "res", next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a req with an invalid token in the headers", () => {
    test("Then it should call the method next() with an error", async () => {
      const expectedError = new Error("No token");
      expectedError.status = 401;
      const req = {
        header: () => ({ replace: jest.fn().mockResolvedValue(true) }),
      };
      const next = jest.fn();

      jsonwebtoken.verify = jest.fn().mockResolvedValue(true);

      await tokenValidator(req, "res", next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a req with an invalid token in the headers", () => {
    test("Then it should call the method next() with an error", async () => {
      const expectedError = new Error("The token is missing");
      expectedError.status = 401;
      const req = {
        header: () => "",
      };
      const next = jest.fn();

      jsonwebtoken.verify = jest.fn().mockResolvedValue(true);

      await tokenValidator(req, "res", next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
