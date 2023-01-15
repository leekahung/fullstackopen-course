const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const User = require("../models/user");

const api = supertest(server);

beforeEach(async () => {
  await User.deleteMany({});
});

test("verify the creation of a user to server", async () => {
  const newUser = {
    username: "testuser1",
    name: "Test User 1",
    password: "test1",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const allUsers = await api.get("/api/users");
  expect(allUsers.body).toHaveLength(1);
  expect(allUsers.body[0]).toEqual(
    expect.objectContaining({
      username: newUser.username,
      name: newUser.name,
    })
  );
});
