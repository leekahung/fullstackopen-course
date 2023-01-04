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

  const returnedSavedBlog = await Blog.findById(savedBlog._id).populate(
    "user",
    { name: 1 }
  );
  response.status(201).json(returnedSavedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: body.likes },
    { new: true }
  );

  const updatedBlogLikes = await Blog.findById(request.params.id).populate(
    "user",
    { name: 1 }
  );
  response.json(updatedBlogLikes);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);
  if (user._id.toString() === blogToDelete.user[0].toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== request.params.id
    );
    await user.save();

    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: "only original poster can delete blog post" });
  }
});

module.exports = blogsRouter;
