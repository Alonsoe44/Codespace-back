const debug = require("debug")("typing-app:serverStart");

const startServer = (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`The server it's up in http://localhost:${port}`);
      resolve();
    });

    server.on("error", (error) => {
      debug(`Oh no the server couldnt start ${error.message}`);
      reject();
    });
  });

module.exports = startServer;
