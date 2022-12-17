require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const { notFoundError, internalServerError } = require("./middlewares/errors");
const javaScriptRouter = require("./routers/snippetsRouters/javaScriptRouter");
const typeScriptRouter = require("./routers/snippetsRouters/typeScriptRouter");

const usersRouter = require("./routers/usersRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use("/javascript", javaScriptRouter);
app.use("/typescript", typeScriptRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);

app.use(notFoundError);
app.use(internalServerError);

module.exports = app;
