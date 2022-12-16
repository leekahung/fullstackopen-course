const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { important: body.important },
    { new: true }
  );

  response.json(updatedNote);
});

notesRouter.delete("/:id", async (request, response, next) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
