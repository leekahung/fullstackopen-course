const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({}).populate("user", {username: 1, name: 1});
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
  const user = await User.findById(body.userId);

  const newNote = body.important
    ? new Note({ ...body, date: new Date().toISOString(), user: user._id })
    : new Note({ ...body, date: new Date().toISOString, important: false, user: user._id});

  const savedNote = await newNote.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

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
