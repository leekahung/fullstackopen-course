const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (_request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      response.json(blog);
    })
    .catch((error) => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((newBlog) => {
      response.status(201).json(newBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
