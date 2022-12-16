const express = require("express");
require("express-async-errors");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const config = require("./utils/config");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info("Connecting with MongoDB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected with MongoDB.");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(middleware.middlewareLogger);
app.use("/api/data", notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;