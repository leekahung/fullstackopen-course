const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    return blogs.map((b) => b.likes).reduce((total, curr) => total + curr, 0);
  }
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((b) => b.likes));
  const mostLiked = blogs.find((b) => b.likes === mostLikes);
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = blogs.reduce((groupByAuthor, blog) => {
    if (!groupByAuthor[blog.author]) {
      groupByAuthor[blog.author] = 0;
    }
    groupByAuthor[blog.author] += 1;
    return groupByAuthor;
  }, {});

  const mostBlog = Math.max(...Object.values(groupedByAuthor));
  const mostBlogAuthor = Object.keys(groupedByAuthor).find(
    (author) => groupedByAuthor[author] === mostBlog
  );

  return {
    author: mostBlogAuthor,
    blogs: mostBlog,
  };
};

const mostLikes = (blogs) => {
  const groupedByAuthor = blogs.reduce((groupByAuthor, blog) => {
    if (!groupByAuthor[blog.author]) {
      groupByAuthor[blog.author] = 0;
    }
    groupByAuthor[blog.author] += blog.likes;
    return groupByAuthor;
  }, {});

  const mostLike = Math.max(...Object.values(groupedByAuthor));
  const mostLikedAuthor = Object.keys(groupedByAuthor).find(
    (author) => groupedByAuthor[author] === mostLike
  );

  return {
    author: mostLikedAuthor,
    likes: mostLike,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
