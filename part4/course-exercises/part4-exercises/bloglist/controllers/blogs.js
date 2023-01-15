const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogRouter;
