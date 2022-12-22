const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const logger = require("./utils/logger");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("Connecting to MongoDB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected with MongoDB.");
  })
  .catch((error) =>
    logger.error("Error connecting with MongoDB:", error.message)
  );

app.use(middleware.middlewareLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
