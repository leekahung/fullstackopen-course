const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = body.likes
    ? new Blog({ ...body, user: user._id })
    : new Blog({ ...body, likes: 0, user: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const updateBlogLikes = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(updateBlogLikes);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
