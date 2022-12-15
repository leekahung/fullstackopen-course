const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const logger = require("./utils/logger");

const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogRoutes");
const middleware = require("./utils/middleware");

logger.info("Connecting to MongoDB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected with MongoDB.");
  })
  .catch((error) =>
    logger.error("Error connecting with MongoDB:", error.message)
  );

app.use(cors());
app.use(express.json());

app.use(middleware.middlewareLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
