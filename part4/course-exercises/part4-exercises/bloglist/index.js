const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./controllers/users");
const blogRouter = require("./controllers/blogs");
const {
  middlewareLogger,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
const config = require("./utils/config");
const loginRouter = require("./controllers/login");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then((result) => {
  if (result) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Connection to MongoDB failed");
  }
});

app.use(cors());
app.use(express.json());
app.use(middlewareLogger);

app.use("/api/login", loginRouter);
app.use(tokenExtractor);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(errorHandler);

const server = http.createServer(app);
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = server;
