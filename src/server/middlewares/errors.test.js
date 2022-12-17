const { notFoundError, internalServerError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a res", () => {
    test("Then it should call the status and json methods", () => {
      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };
      const expectedError = { error: true, message: "Endpoint not found" };
      const expectedStatus = 404;

      notFoundError("", res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a internalServerError middleware", () => {
  describe("When it receives an error and a res", () => {
    test("Then it should call the status and json methods", () => {
      const err = {
        message: "Oh no there is fire in the hole",
        status: 367,
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };
      const expectedStatus = err.status;
      const expectedErrorMessage = err.message;
      const expectedError = { error: true, message: expectedErrorMessage };

      internalServerError(err, "", res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an error and a res", () => {
    test("Then it should call the status and json methods", () => {
      const err = {
        status: null,
      };
      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const expectedErrorMessage = "General pete";
      const expectedError = { error: true, message: expectedErrorMessage };

      internalServerError(err, "", res);

      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
