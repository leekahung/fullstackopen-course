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
    likes: 3,
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
      likes: 3,
    })
  );
});

test("verify likes property is 0 by default if likes property is missing", async () => {
  const blogPost = {
    title: "New blog",
    author: "Alice",
    url: "some url",
  };

  await api
    .post("/api/blogs")
    .send(blogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body[response.body.length - 1].likes).toBe(0);
});

test("verify if title or url properties are missing, return 400 Bad Request", async () => {
  const blogPost1 = {
    author: "Alice",
    url: "some url",
  };

  await api.post("/api/blogs").send(blogPost1).expect(400);

  const blogPost2 = {
    title: "New Blog Post",
    author: "Alice",
  };

  await api.post("/api/blogs").send(blogPost2).expect(400);
});

test("verify the deletion of a single blog post", async () => {
  const blogsInitial = await api.get("/api/blogs");
  const blogToDelete = blogsInitial.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body).toHaveLength(blogsInitial.body.length - 1);

  // second blog expect to be first blog
  const { title, author, url, likes } = initialBlogs[1];
  expect(blogsAfter.body[0]).toEqual(
    expect.objectContaining({
      title,
      author,
      url,
      likes,
    })
  );
});

test("verify 400 Bad Request if trying to delete id that doesn't exist", async () => {
  await api.delete(`/api/blogs/1234456`).expect(400);
});

test("verify updated likes on blog post", async () => {
  const blogsInitial = await api.get("/api/blogs");
  const blogToUpdate = blogsInitial.body[0];

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

  const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);
  expect(updatedBlog.body.likes).toBe(8);
});

afterAll(() => {
  mongoose.connection.close();
});
