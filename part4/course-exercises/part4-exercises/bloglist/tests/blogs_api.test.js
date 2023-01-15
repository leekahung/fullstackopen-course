const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const api = supertest(server);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
