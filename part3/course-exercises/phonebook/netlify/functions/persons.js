const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const { middlewareLogger, errorHandler } = require("./utils/middleware");
app.use(middlewareLogger);

const Person = require("./models/person");

app.get("/api/persons", (_request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).send({
          error: "ID does not exist",
        });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  Person.findOne({ name: body.name }).then((person) => {
    if (person) {
      response.status(400).send({
        error: `${body.name} already exist in phonebook`,
      });
    } else {
      const newPerson = new Person(body);

      newPerson
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

// Unused in 3-20 which ask to respond with error instead of ask for update
/* app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const personToUpdate = {
    ...body,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, personToUpdate, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
}); */

app.use(errorHandler);

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
