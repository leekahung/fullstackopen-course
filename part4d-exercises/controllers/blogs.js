const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const newBlog = body.likes
    ? new Blog({ ...body, author: user.name, user: user._id })
    : new Blog({ ...body, author: user.name, likes: 0, user: user._id });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.findByIdAndUpdate(
    request.body.id,
    { likes: request.body.likes },
    { new: true }
  );

  response.json(blogToUpdate);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    user.blogs = user.blogs.filter(b => b._id.toString() !== request.params.id);
    await user.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: "Invalid user token" });
  }
});

module.exports = blogsRouter;
