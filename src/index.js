require("dotenv").config();
const debug = require("debug")("typing-app:root");
const connectRobotArmyDataBase = require("./database");
const app = require("./server");
const startServer = require("./server/startServer");

const serverPort = process.env.PORT;
const loginConectionCredentials = process.env.LOGIN_CREDENTIALS;

(async () => {
  try {
    await connectRobotArmyDataBase(loginConectionCredentials);
    await startServer(app, serverPort);
  } catch (error) {
    debug("The server it's broken");
  }
})();

debug(serverPort);
