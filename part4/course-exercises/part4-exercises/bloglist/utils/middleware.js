const morgan = require("morgan");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
  Method: :method
  Path - Status: :url :status
  Body: :body
`);

const errorHandler = (error, _request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "Invalid id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid or missing token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }

  next(error);
};

module.exports = {
  middlewareLogger,
  errorHandler,
};
