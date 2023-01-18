import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "Some title",
      author: "author name",
      url: "some url",
      likes: 4,
      user: "user name",
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("renders blog title and author, but not url or likes by default", async () => {
    const blogInfo = container.querySelector(".blog-info");
    expect(blogInfo).toBeDefined();
    expect(blogInfo).toHaveTextContent("Some title author name view");

    const togglable = container.querySelector(".blog-url").parentElement;
    expect(togglable).toHaveStyle("display: none");
  });
});
