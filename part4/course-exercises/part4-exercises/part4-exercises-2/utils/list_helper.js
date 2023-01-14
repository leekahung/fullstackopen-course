const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const likesList = blogs.map((blog) => blog.likes);

  return likesList.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const likesList = blogs.map((blog) => blog.likes);
  const blog = blogs.find((blog) => blog.likes === Math.max(...likesList));

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({
      author: key,
      blogs: value.length,
    }))
    .value()
    .sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({
      author: key,
      likes: value
        .map((item) => item.likes)
        .reduce(function (total, currVal) {
          return total + currVal;
        }, 0),
    }))
    .value()
    .sort((a, b) => b.likes - a.likes)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
