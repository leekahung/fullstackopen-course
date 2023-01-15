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
  const body = request.body;

  const newBlog = new Blog({
    ...body,
    likes: body.likes || 0,
  });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
