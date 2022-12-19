const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  const newNote = body.important
    ? new Note({ ...body, date: new Date().toISOString() })
    : new Note({ ...body, date: new Date().toISOString, important: false });

  const savedNote = await newNote.save();
  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const noteToUpdate = await Note.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(noteToUpdate);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
