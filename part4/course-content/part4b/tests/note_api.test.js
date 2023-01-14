const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
});

describe("when there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    console.log("Entered test");
    await api
      .get("/api/data")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all notes are returned", async () => {
    const response = await api.get("/api/data");
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/data");
    const contents = response.body.map((r) => r.content);
    expect(contents).toContain("Browser can execute only Javascript");
  });
});

describe("viewing a specific note", () => {
  test("a specific note can be viewed", async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/data/${noteToView.id}`)
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
    await api.get(`/api/data/${invalidId}`).expect(400);
  });
});

describe("Adding a new note", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/data")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("note without content is not added and returns 400 Bad Request", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/data").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("Deleting a note from DB", () => {
  test("a note delete with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/data/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDB();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
