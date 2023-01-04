const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
const config = require("./config");
const User = require("../models/user");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
  Method: :method
  Path - Status - Response Time: :url :status :response-time
  Body: :body
`);

const unknownEndpoint = (_request, response) => {
  return response.status(404).send({
    error: "Unknown Endpoint",
  });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === "CaseError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Invalid token",
    });
  } else if (error.name === "ExpiredTokenError") {
    return response.status(401).json({
      error: "Token expired. Log in again for new token.",
    });
  }

  next();
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
      error: "Token missing or invaid",
    });
  }

  request["user"] = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  middlewareLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
