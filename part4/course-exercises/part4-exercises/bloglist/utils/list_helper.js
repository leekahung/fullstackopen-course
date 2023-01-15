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

module.exports = {
  dummy,
  totalLikes,
};
