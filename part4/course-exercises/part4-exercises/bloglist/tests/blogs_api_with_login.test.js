const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const api = supertest(server);
const Blog = require("../models/blog");
const User = require("../models/user");

const initialUsers = [
  {
    username: "testuser1",
    name: "Test User 1",
    password: "test1",
  },
  {
    username: "testuser2",
    name: "Test User 2",
    password: "test2",
  },
];

describe("/api/login", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await api.post("/api/users").send(initialUsers[0]);
  });

  test("verify user login", async () => {
    await api
      .post("/api/login")
      .send({ username: "testuser1", password: "test1" })
      .expect(200);
  });

  test("verify user login with incorrect credentials", async () => {
    await api
      .post("/api/login")
      .send({ username: "testuser1", password: "wrong" })
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
