const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

const http = require("http");
const server = http.createServer(app);
const api = supertest(server);

test("return all blogs as json after logging in", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 1000000);

test("verify unique identifier property is defined as id", async () => {
  const blogs = await api.get("/api/blogs");
  expect(blogs.body[0].id).toBeDefined();
});

let authorization;

beforeEach(async () => {
  const userCarl = {
    username: "carl",
    password: "carl",
  };

  const loginResponse = await api.post("/api/login").send(userCarl);

  authorization = { Authorization: `bearer ${loginResponse.body.token}` };
});

test("verify POST request creates new blog post after login and likes default to 0 if missing", async () => {
  const blogsInitial = await api.get("/api/blogs");

  const newBlog = {
    title: "New Blog from Tests",
    url: "some url",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set(authorization)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body).toHaveLength(blogsInitial.body.length + 1);

  expect(blogsAfter.body[blogsAfter.body.length - 1].likes).toBe(0);
});

test("if title or url is missing from request with authorization, return 400 Bad Request", async () => {
  const blogsInitial = await api.get("/api/blogs");

  const newBlog = {
    title: "Some blog",
    author: "Carl",
  };

  await api.post("/api/blogs").send(newBlog).set(authorization).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(blogsInitial.body.length);
});

test("deleting existing blog from list returns 204 if deleted by user", async () => {
  const blogsInitial = await api.get("/api/blogs");
  const blogToDelete = blogsInitial.body[blogsInitial.body.length - 1];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set(authorization)
    .expect(204);

  const updatedBlogs = await api.get("/api/blogs");
  expect(updatedBlogs.body).toHaveLength(blogsInitial.body.length - 1);
});

test("updating existing blog likes from list return updated blogs likes + 1", async () => {
  const blogsInitial = await api.get("/api/blogs");
  const blogToUpdate = blogsInitial.body[blogsInitial.body.length - 1];
  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`, updatedBlog)
    .send(updatedBlog)
    .expect(200);

  const updatedBlogsList = await api.get("/api/blogs");
  expect(updatedBlogsList.body[blogsInitial.body.length - 1].likes).toBe(
    blogsInitial.body[blogsInitial.body.length - 1].likes + 1
  );

  expect(updatedBlogsList.body[blogsInitial.body.length - 1]).toEqual(
    updatedBlog
  );
});

test("Return 401 Unauthorized if token is not provided when POST request is made", async () => {
  const blogsInitial = await api.get("/api/blogs");

  const newBlog = {
    title: "Unauthorized blog",
    url: "some url",
  };

  await api.post("/api/blogs").send(newBlog).expect(401);

  const blogsAfter = await api.get("/api/blogs");
  expect(blogsAfter.body).toHaveLength(blogsInitial.body.length);
});

afterAll(() => {
  mongoose.connection.close();
});
