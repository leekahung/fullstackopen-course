const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const { middlewareLogger, errorHandler } = require("./utils/middleware");
const config = require("./utils/config");

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

app.use("/api/blogs", blogRouter);

app.use(errorHandler);

const server = http.createServer(app);
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
