const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const noteRouter = require("./controllers/notes");

console.log("Connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

app.use(middleware.middlewareLogger);
app.use("/api/data", noteRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
