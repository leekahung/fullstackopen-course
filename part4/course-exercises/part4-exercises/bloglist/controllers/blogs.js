const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
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

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const newBlog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user.toString() === user._id.toString()) {
    user.blogs = user.blogs.filter(
      (b) => b._id.toString() !== request.params.id
    );
    await user.save();

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(400).json({
      error: "Only blog post user can delete this post",
    });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      ...request.body,
      likes: request.body.likes + 1,
    },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogRouter;
