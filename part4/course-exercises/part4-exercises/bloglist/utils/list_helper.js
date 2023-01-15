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

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
};
