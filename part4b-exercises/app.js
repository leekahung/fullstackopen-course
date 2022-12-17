const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const config = require("./utils/config");

app.use(express.json());
app.use(cors());

console.log("Connecting with MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected with MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting with MongoDB:", error.message);
  });

app.use(middleware.middlewareLogger);
app.use("/api/data", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
