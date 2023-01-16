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

describe("/api/users", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await api.post("/api/users").send(initialUsers[0]);
  });

  test("verify blogs property added to user", async () => {
    const allUsers = await api.get("/api/users");
    expect(allUsers.body[0]).toEqual(
      expect.objectContaining({
        username: initialUsers[0].username,
        name: initialUsers[0].name,
        blogs: [],
      })
    );
  });

  test("verify blogs being added to testuser1", async () => {
    const allUsersInitial = await api.get("/api/users");
    const testuser1 = allUsersInitial.body[0];

    const newPost = {
      title: "New blog",
      author: "New author",
      url: "some url",
      user: testuser1.id,
    };

    await api.post("/api/blogs").send(newPost);
    const allUsersAfter = await api.get("/api/users");
    expect(allUsersAfter.body[0].blogs).toHaveLength(1);
    expect(allUsersAfter.body[0].blogs[0]).toEqual(
      expect.objectContaining({
        title: newPost.title,
        author: newPost.author,
        url: newPost.url,
      })
    );
  });
});

describe("/api/blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    await api.post("/api/users").send(initialUsers[0]);
  });

  test("verify user property added to blogs in new blog posts", async () => {
    const allUsersInitial = await api.get("/api/users");
    const testuser1 = allUsersInitial.body[0];

    const newPost = {
      title: "New blog",
      author: "New author",
      url: "some url",
      user: testuser1.id,
    };

    await api.post("/api/blogs").send(newPost);

    const allBlogs = await api.get("/api/blogs");
    expect(allBlogs.body[0]).toEqual(
      expect.objectContaining({
        title: newPost.title,
        author: newPost.author,
        url: newPost.url,
        user: {
          username: testuser1.username,
          name: testuser1.name,
          id: testuser1.id,
        },
      })
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
