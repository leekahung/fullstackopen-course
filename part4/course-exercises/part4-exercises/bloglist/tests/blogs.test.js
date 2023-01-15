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
  ];

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
    console.log(result);

    expect(result).toEqual({
      title: "Bob creates house",
      author: "Bob",
      likes: 10,
    });
  });

  test("favoriteBlog returns first blog with most likes if there's multiple top liked blogs", () => {
    const result = listHelper.favoriteBlog(listWithMultipleTopBlogs);
    console.log(result);

    expect(result).toEqual({
      title: "Alice Rock Climbing Technique",
      author: "Alice",
      likes: 10,
    });
  });
});
