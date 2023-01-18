const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const config = require("./utils/config");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const {
  middlewareLogger,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then((response) => {
  if (response) {
    console.log("Connected to MongoDB database");
  } else {
    console.log("Failed to connect to MongoDB");
  }
});

app.use(middlewareLogger);
app.use(tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(errorHandler);

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
