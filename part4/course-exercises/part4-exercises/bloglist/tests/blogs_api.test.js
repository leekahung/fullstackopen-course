const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const Blog = require("../models/blog");
const { initialBlogs } = require("../utils/list_helper");

const api = supertest(server);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify unique identify property is defined as id", async () => {
  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].id).toBeDefined();
});

test("verify the creation of blog post to server", async () => {
  const blogPost = {
    title: "New blog",
    author: "Alice",
    url: "some url",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(blogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(response.body[response.body.length - 1]).toEqual(
    expect.objectContaining({
      title: "New blog",
      author: "Alice",
      url: "some url",
      likes: 0,
    })
  );
});

afterAll(() => {
  mongoose.connection.close();
});
