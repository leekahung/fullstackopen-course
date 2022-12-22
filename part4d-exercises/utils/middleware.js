const morgan = require("morgan");
const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
  Method: :method
  Path - Status: :url :status
  Body: :body
`);

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === "CaseError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(400).json({ error: "token expired" });
  }

  next(error);
};

const unknownEndpoint = (_request, response) => {
  return response.status(404).json({ error: "Unknown Endpoint" });
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
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  request["user"] = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  middlewareLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
