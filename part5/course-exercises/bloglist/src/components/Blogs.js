import { useEffect, useState, useRef } from "react";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";
import PropTypes from "prop-types";

const Blogs = ({ user, runNotifications }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  const sortBlogsByLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes;
  };

  useEffect(() => {
    if (user) {
      blogService.getAll().then((returnedBlogs) => {
        setBlogs(returnedBlogs.sort((a, b) => sortBlogsByLikes(a, b)));
      });
    }
  }, [user]);

  const handleAddBlog = async (blogFormValues) => {
    const newBlog = await blogService.createNew(blogFormValues);
    setBlogs(blogs.concat(newBlog));
    runNotifications(`${newBlog.title} by ${newBlog.author} added`, 5000);
    blogFormRef.current.toggleVisibility();
  };

  const handleLikeBlog = async (blog) => {
    const blogLiked = { id: blog.id, likes: blog.likes + 1 };
    const updatedBlog = await blogService.updateObject(blogLiked);
    setBlogs(
      blogs
        .map((b) => (b.id === blogLiked.id ? updatedBlog : b))
        .sort((a, b) => sortBlogsByLikes(a, b))
    );
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.removeObject(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        runNotifications(`Blog ${blog.title} by ${blog.author} removed`, 5000);
      } catch (exception) {
        if (exception.response.status === 401) {
          runNotifications(
            "Error: Only original blog post user can delete this post",
            5000,
            "error"
          );
        } else {
          runNotifications(
            "Error: Error trying to remove blog post from database",
            5000,
            "error"
          );
        }
      }
    }
  };

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h1>create new</h1>
        <BlogForm
          handleAddBlog={handleAddBlog}
          runNotifications={runNotifications}
        />
      </Togglable>
      <div>
        {blogs.map((b) => {
          return (
            <Blog
              key={b.id}
              blog={b}
              handleLikeBlog={handleLikeBlog}
              handleDeleteBlog={handleDeleteBlog}
            />
          );
        })}
      </div>
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  runNotifications: PropTypes.func.isRequired,
};

export default Blogs;
