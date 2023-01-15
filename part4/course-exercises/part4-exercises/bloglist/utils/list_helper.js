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
  const mostLiked = blogs.filter((b) => b.likes === mostLikes);
  return {
    title: mostLiked[0].title,
    author: mostLiked[0].author,
    likes: mostLiked[0].likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
