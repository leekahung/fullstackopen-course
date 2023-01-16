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

const newPost = {
  title: "New Blog",
  author: "Blog Author",
  url: "some url",
};

let authorization;
let authorization2;
let currentUsers;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await api.post("/api/users").send(initialUsers[0]);
  await api.post("/api/users").send(initialUsers[1]);

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser1", password: "test1" });
  authorization = { Authorization: `bearer ${loginResponse.body.token}` };
  const loginResponse2 = await api
    .post("/api/login")
    .send({ username: "testuser2", password: "test2" });
  authorization2 = { Authorization: `bearer ${loginResponse2.body.token}` };
  currentUsers = await api.get("/api/users");
});

describe("/api/login", () => {
  test("return 200 OK when login with correct credentials", async () => {
    await api
      .post("/api/login")
      .send({ username: "testuser1", password: "test1" })
      .expect(200);
  });

  test("return 401 Unauthorized when login with incorrect credentials", async () => {
    await api
      .post("/api/login")
      .send({ username: "testuser1", password: "wrong" })
      .expect(401);
  });
});

describe("/api/users", () => {
  test("verify blogs being added to testuser1 with token", async () => {
    const testuser1Initial = currentUsers.body[0];

    await api.post("/api/blogs").send(newPost).set(authorization);
    const testuser1After = await api.get(`/api/users/${testuser1Initial.id}`);
    expect(testuser1After.body.blogs).toHaveLength(1);
    expect(testuser1After.body.blogs[0]).toEqual(
      expect.objectContaining({
        title: newPost.title,
        author: newPost.author,
        url: newPost.url,
      })
    );
  });

  test("verify blogs not removed from testuser1 without token", async () => {
    const testuser1Initial = currentUsers.body[0];

    await api.post("/api/blogs").send(newPost).set(authorization);
    const testuser1PostBlog = await api.get(
      `/api/users/${testuser1Initial.id}`
    );
    expect(testuser1PostBlog.body.blogs).toHaveLength(1);
    const blogs = await api.get("/api/blogs");
    const blogToDelete = blogs.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const testuser1DeleteBlog = await api.get(
      `/api/users/${testuser1Initial.id}`
    );
    expect(testuser1DeleteBlog.body.blogs).toHaveLength(1);
  });

  test("verify blogs being removed from testuser1 with token", async () => {
    const testuser1Initial = currentUsers.body[0];

    await api.post("/api/blogs").send(newPost).set(authorization);
    const testuser1PostBlog = await api.get(
      `/api/users/${testuser1Initial.id}`
    );
    expect(testuser1PostBlog.body.blogs).toHaveLength(1);
    const blogs = await api.get("/api/blogs");
    const blogToDelete = blogs.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(authorization)
      .expect(204);

    const testuser1DeleteBlog = await api.get(
      `/api/users/${testuser1Initial.id}`
    );
    expect(testuser1DeleteBlog.body.blogs).toHaveLength(0);
  });

  test("verify blogs not added without token", async () => {
    const testuser1Initial = currentUsers.body[0];

    await api.post("/api/blogs").send(newPost);
    const testuser1After = await api.get(`/api/users/${testuser1Initial.id}`);
    expect(testuser1After.body.blogs).toHaveLength(0);
  });
});

describe("/api/blogs", () => {
  test("return 401 Unauthorized if posting blog without token", async () => {
    await api.post("/api/blogs").send(newPost).expect(401);
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(0);
  });

  test("return 201 Created if blog posted with token", async () => {
    const { username, name, id } = currentUsers.body[0];

    await api.post("/api/blogs").send(newPost).set(authorization).expect(201);
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(1);
    expect(blogs.body[0]).toEqual(
      expect.objectContaining({
        ...newPost,
        user: {
          username,
          name,
          id,
        },
      })
    );
  });

  test("verify updated blog with 1 like when triggered", async () => {
    await api.post("/api/blogs").send(newPost).set(authorization);
    const blogsInitial = await api.get("/api/blogs");
    const blogToUpdate = blogsInitial.body[0];

    const { username, name, id } = currentUsers.body[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(202);
    const blogsAfter = await api.get("/api/blogs");
    expect(blogsAfter.body).toHaveLength(1);
    expect(blogsAfter.body[0]).toEqual(
      expect.objectContaining({
        ...newPost,
        likes: 1,
        user: {
          username,
          name,
          id,
        },
      })
    );
  });

  test("return 401 Unauthorized if deleting a post not made by user", async () => {
    await api.post("/api/blogs").send(newPost).set(authorization);
    const blogsInitial = await api.get("/api/blogs");
    const blogToDelete = blogsInitial.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(authorization2)
      .expect(401);
    const blogsAfter = await api.get("/api/blogs");
    expect(blogsAfter.body).toHaveLength(1);
  });

  test("return 204 No Content when deleting blog with token", async () => {
    await api.post("/api/blogs").send(newPost).set(authorization);
    const blogsInitial = await api.get("/api/blogs");
    const blogToDelete = blogsInitial.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(authorization)
      .expect(204);
    const blogsAfter = await api.get("/api/blogs");
    expect(blogsAfter.body).toHaveLength(0);
  });

  test("return 404 Not Found when deleting a blog that doesn't exist when holding a token", async () => {
    await api
      .delete(`/api/blogs/63c506c206c9cc6f96f5b55f`)
      .set(authorization)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
