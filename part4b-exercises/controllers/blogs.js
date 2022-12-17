const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogsInDB = await Blog.find({});
  response.json(blogsInDB);
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

  let newBlog = body.likes ? new Blog(body) : new Blog({ ...body, likes: 0 });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  });

  response.json(updatedNote);
});

module.exports = blogRouter;
