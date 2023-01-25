const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const {
  errorHandler,
  middlewareLogger,
  tokenExtractor,
} = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI).then((response) => {
  if (response) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Failed to connect to MongoDB");
  }
});

app.use(middlewareLogger);
app.use(tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(errorHandler);

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
