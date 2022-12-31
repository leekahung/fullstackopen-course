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
      likes: "0",
      user: "user name",
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("initially contain only blog title and author", () => {
    const element = screen.getByText("Some title author name");
    expect(element).toBeDefined();

    const div = container.querySelector(".blog-info").parentElement;
    expect(div).toHaveStyle("display: none");
  });

  test("shows other info about blog after toggled", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".blog-info").parentElement;
    expect(div).not.toHaveStyle("display: none");
  });
});

test("<Blog /> check if like button is called twice if clicked twice", async () => {
  const user = userEvent.setup();
  const handleLikeBlog = jest.fn();

  const blog = {
    title: "Some title",
    author: "author name",
    url: "some url",
    likes: "0",
    user: "user name",
  };

  const container = render(
    <Blog blog={blog} handleLikeBlog={handleLikeBlog} />
  ).container;

  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = container.querySelector(".likeBtn");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(handleLikeBlog.mock.calls).toHaveLength(2);
});
