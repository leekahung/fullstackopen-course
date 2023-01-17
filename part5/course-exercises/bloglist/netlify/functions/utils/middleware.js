const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/user");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
  Method: :method
  Path - Status: :url :status
  Body: :body
`);

const errorHandler = (error, _request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({
      error: "Malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Token missing or invalid",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "Token expired",
    });
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request["token"] = authorization.substring(7);
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({
      error: "Token missing or invalid",
    });
  }
  request["user"] = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  middlewareLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
