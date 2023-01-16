const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const User = require("../models/user");

const api = supertest(server);

beforeEach(async () => {
  await User.deleteMany({});
});

describe("user creation", () => {
  test("verify user creation to server", async () => {
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

  test("verify 400 Bad Request with non-unique username", async () => {
    const newUser1 = {
      username: "testuser1",
      name: "Test User 1",
      password: "test1",
    };

    await api.post("/api/users").send(newUser1).expect(201);

    const newUser2 = {
      username: "testuser1",
      name: "Test User 2",
      password: "test2",
    };

    await api.post("/api/users").send(newUser2).expect(400);

    const allUsers = await api.get("/api/users");
    expect(allUsers.body).toHaveLength(1);
  });

  test("verify 400 Bad Request if username length < 3", async () => {
    const newUser = {
      username: "no",
      name: "Test User",
      password: "test",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const allUsers = await api.get("/api/users");
    expect(allUsers.body).toHaveLength(0);
  });

  test("verify 400 Bad Request if password length < 3", async () => {
    const newUser = {
      username: "testuser",
      name: "Test User",
      password: "no",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const allUsers = await api.get("/api/users");
    expect(allUsers.body).toHaveLength(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
