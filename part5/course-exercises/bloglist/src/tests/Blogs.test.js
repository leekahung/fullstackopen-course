import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  let container;
  const handleLikeBlog = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Some title",
      author: "author name",
      url: "some url",
      likes: 4,
      user: "user name",
    };

    container = render(
      <Blog blog={blog} handleLikeBlog={handleLikeBlog} />
    ).container;
  });

  test("renders blog title and author, but not url or likes by default", async () => {
    const blogInfo = container.querySelector(".blog-info");
    expect(blogInfo).toBeDefined();
    expect(blogInfo).toHaveTextContent("Some title author name view");

    const togglable = container.querySelector(".blog-url").parentElement;
    expect(togglable).toHaveStyle("display: none");
  });

  test("check url and likes are rendered when view button is toggled", async () => {
    const user = userEvent.setup();
    const viewBtn = screen.getByText("view");
    await user.click(viewBtn);

    const blogUrl = container.querySelector(".blog-url");
    expect(blogUrl).toHaveTextContent("some url");
    const blogLikes = container.querySelector(".blog-likes");
    expect(blogLikes).toHaveTextContent("likes 4 like");

    const togglable = blogUrl.parentElement;
    expect(togglable).not.toHaveStyle("display: none");
  });

  test("check event handler is called twice when like button is clicked twice", async () => {
    const user = userEvent.setup();
    const viewBtn = screen.getByText("view");
    await user.click(viewBtn);

    const likeBtn = container.querySelector(".like-btn");
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(handleLikeBlog.mock.calls).toHaveLength(2);
  });
});
