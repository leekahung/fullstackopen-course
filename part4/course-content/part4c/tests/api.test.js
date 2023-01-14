const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
});

describe("when there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    console.log("Entered test");
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((r) => r.content);
    expect(contents).toContain("Browser can execute only Javascript");
  });
});

describe("viewing a specific note", () => {
  test("a specific note can be viewed", async () => {
    const notesAtStart = await Note.find({});
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test("fails with 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    console.log(validNonexistingId);
    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with 400 if id is not valid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("Adding a new note", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await Note.find({});
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("note without content is not added and returns 400 Bad Request", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await Note.find({});
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("Deleting a note from DB", () => {
  test("a note delete with status code 204 if id is valid", async () => {
    const notesAtStart = await Note.find({});
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await Note.find({});
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

describe("When there is initially one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secretpassword", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creaction suceeds with a fresh username", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "aceui",
      name: "Alice Ceui",
      password: "bigSecret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    console.log(usersAtEnd);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
