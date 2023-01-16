import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

test("<Blog /> create new blog with correct information onSubmit", async () => {
  const user = userEvent.setup();
  const handleAddBlog = jest.fn();

  render(<BlogForm handleAddBlog={handleAddBlog} />);

  const blogTitle = screen.getByPlaceholderText("New blog title");
  const blogAuthor = screen.getByPlaceholderText("New blog author");
  const blogUrl = screen.getByPlaceholderText("New blog url");

  const submitButton = screen.getByText("create");

  await user.type(blogTitle, "new title");
  await user.type(blogAuthor, "new author");
  await user.type(blogUrl, "blog url");
  await user.click(submitButton);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  expect(handleAddBlog.mock.calls[0][0].title).toBe("new title");
  expect(handleAddBlog.mock.calls[0][0].author).toBe("new author");
  expect(handleAddBlog.mock.calls[0][0].url).toBe("blog url");
});
