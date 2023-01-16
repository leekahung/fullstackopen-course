const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Bob creates house",
      author: "Bob",
      url: "some Url",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f0",
      title: "Carl",
      author: "Carl",
      url: "some url",
      likes: 2,
      __v: 0,
    },
  ];

  const listWithMultipleTopBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f2",
      title: "Alice Rock Climbing Technique",
      author: "Alice",
      url: "some Url",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Bob creates house",
      author: "Bob",
      url: "some Url",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f0",
      title: "Carl",
      author: "Carl",
      url: "some url",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Alice Rock Climbing Technique",
      author: "Alice",
      url: "some Url",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Alice decorates house",
      author: "Alice",
      url: "some Url",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f1",
      title: "Alice",
      author: "Alice",
      url: "some url",
      likes: 2,
      __v: 0,
    },
  ];

  const courseList = [
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

  describe("List Check 1", () => {
    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      expect(result).toBe(5);
    });

    test("when list has multiple blogs, equals sum of all likes", () => {
      const result = listHelper.totalLikes(listWithMultipleBlogs);
      expect(result).toBe(17);
    });

    test("favoriteBlog returns blog with most likes", () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);

      expect(result).toEqual({
        title: "Bob creates house",
        author: "Bob",
        likes: 10,
      });
    });

    test("favoriteBlog returns first blog with most likes if there's multiple top liked blogs", () => {
      const result = listHelper.favoriteBlog(listWithMultipleTopBlogs);

      expect(result).toEqual({
        title: "Alice Rock Climbing Technique",
        author: "Alice",
        likes: 10,
      });
    });

    test("mostBlogs returns author with most blogs and the total number of blogs", () => {
      const result = listHelper.mostBlogs(listWithMultipleTopBlogs);

      expect(result).toEqual({
        author: "Alice",
        blogs: 4,
      });
    });

    test("mostLikes returns author with most likes and total sum of likes", () => {
      const result = listHelper.mostLikes(listWithMultipleTopBlogs);

      expect(result).toEqual({
        author: "Alice",
        likes: 32,
      });
    });
  });

  describe("List Check 2", () => {
    test("when list has multiple blogs, equals sum of all likes", () => {
      const result = listHelper.totalLikes(courseList);
      expect(result).toBe(36);
    });

    test("favoriteBlog returns blog with most likes", () => {
      const result = listHelper.favoriteBlog(courseList);

      expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      });
    });

    test("mostBlogs returns author with most blogs and the total number of blogs", () => {
      const result = listHelper.mostBlogs(courseList);

      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3,
      });
    });

    test("mostLikes returns author with most likes and total sum of likes", () => {
      const result = listHelper.mostLikes(courseList);

      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17,
      });
    });
  });
});
