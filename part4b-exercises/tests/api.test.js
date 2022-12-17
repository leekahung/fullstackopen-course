const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./helperList");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("return all blogs as json", async () => {
  await api
    .get("/api/data")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 1000000);

test("verify unique identifier property is defined as id", async () => {
  const blogs = await api.get("/api/data");
  expect(blogs.body[0].id).toBeDefined();
});

test("verify POST request creates new blog post", async () => {
  const newBlog = {
    title: "New Blog",
    author: "Bob",
    url: "some url",
    likes: 0,
  };

  await api
    .post("/api/data")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/data");
  expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1);
});

test("verify if property, like, is missing from request, likes default to value 0", async () => {
  const newBlog = {
    title: "This blog",
    author: "Alice",
    url: "some url",
  };

  await api
    .post("/api/data")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/data");
  expect(blogs.body[blogs.body.length - 1].likes).toBe(0);
});

test("if title or url is missing from request, return 400 Bad Request", async () => {
  const newBlog = {
    title: "Some blog",
    author: "Carl",
  };

  await api.post("/api/data").send(newBlog).expect(400);

  const response = await api.get("/api/data");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("deleting existing blog from list returns 204", async () => {
  const blogs = await api.get("/api/data");
  const blogToDelete = blogs.body[0];

  await api.delete(`/api/data/${blogToDelete.id}`).expect(204);

  const updatedBlogs = await api.get("/api/data");
  expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length - 1);
});

test("updating existing blog likes from list return updated blogs likes + 1", async () => {
  const blogs = await api.get("/api/data");
  const blogToUpdate = blogs.body[0];
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  };

  await api
    .put(`/api/data/${blogToUpdate.id}`, updatedBlog)
    .send(updatedBlog)
    .expect(200);

  const updatedBlogsList = await api.get("/api/data");
  expect(updatedBlogsList.body[0].likes).toBe(helper.initialBlogs[0].likes + 1);

  expect(updatedBlogsList.body[0]).toEqual(updatedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
