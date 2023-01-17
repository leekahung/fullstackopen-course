const blogRouter = require("express").Router();
const Blog = require("../models/blog");
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
    return response.json(blog);
  } else {
    return response.status(404).json({
      error: "Blog does not exist",
    });
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

  const returnedSavedBlog = await Blog.findById(savedBlog._id).populate(
    "user",
    { name: 1 }
  );
  response.status(201).json(returnedSavedBlog);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    return response.status(404).json({
      error: "Blog does not exist",
    });
  }

  if (user._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter((b) => b.id !== request.params.id);
    await user.save();

    return response.status(204).end();
  } else {
    return response.status(401).json({
      error: "Only the original blog post user can delete this blog",
    });
  }
});

blogRouter.put(":/id", async (request, response) => {
  const body = request.body;
  const blogToUpdate = await Blog.findById(request.params.id);
  const updateBlog = {
    ...blogToUpdate,
    likes: body.likes + 1,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateBlog,
    { new: true }
  );

  response.status(202).json(updatedBlog);
});

module.exports = blogRouter;
