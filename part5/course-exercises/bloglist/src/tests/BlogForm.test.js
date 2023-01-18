import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm />", () => {
  test("check create new blog with correct information when submitted", async () => {
    const user = userEvent.setup();
    const handleAddBlog = jest.fn();
    render(<BlogForm handleAddBlog={handleAddBlog} />);

    const blogTitle = screen.getByPlaceholderText("new title");
    const blogAuthor = screen.getByPlaceholderText("new author");
    const blogUrl = screen.getByPlaceholderText("new url");

    const submitBtn = screen.getByText("create");

    await user.type(blogTitle, "New Blog");
    await user.type(blogAuthor, "Cool Author");
    await user.type(blogUrl, "Best Url");
    await user.click(submitBtn);

    expect(handleAddBlog.mock.calls).toHaveLength(1);
    expect(handleAddBlog.mock.calls[0][0].title).toBe("New Blog");
    expect(handleAddBlog.mock.calls[0][0].author).toBe("Cool Author");
    expect(handleAddBlog.mock.calls[0][0].url).toBe("Best Url");
  });
});
