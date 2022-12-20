const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.params.id);

  const note = body.important
    ? new Note({ ...body, date: new Date().toISOString(), user: user._id })
    : new Note({
        ...body,
        important: false,
        date: new Date().toISOString(),
        user: user._id,
      });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { important: request.body.id },
    { new: true }
  );

  response.json(updatedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
