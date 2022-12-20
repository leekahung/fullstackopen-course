const express = require("express");
require("express-async-errors");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");

console.log("Connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error connecting with MongoDB: ", error.message);
  });

app.use(middleware.middlewareLogger);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
