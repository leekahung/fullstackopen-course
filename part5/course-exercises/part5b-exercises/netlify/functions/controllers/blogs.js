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
  const { user, ...bodyToUpdate } = request.body;

  const updateBlogLikes = await Blog.findByIdAndUpdate(
    request.params.id,
    bodyToUpdate,
    { new: true }
  );
  response.json(updateBlogLikes);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  await Blog.findByIdAndDelete(request.params.id);
  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== request.params.id
  );
  await user.save();

  response.status(204).end();
});

module.exports = blogsRouter;
