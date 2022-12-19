const morgan = require("morgan");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
  Method: :method
  Path - Status: :url - :status
  Body: :body
`);

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Invalid ID or ID does not exist in server" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  middlewareLogger,
  unknownEndpoint,
  errorHandler,
};
