const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../index");

const Blog = require("../models/blog");
const initialBlogs = require("../utils/list_helper");

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

afterAll(() => {
  mongoose.connection.close();
});
