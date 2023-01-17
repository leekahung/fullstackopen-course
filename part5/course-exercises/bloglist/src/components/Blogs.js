import { useEffect, useState, useRef } from "react";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blog = ({ blog, handleLikeBlog }) => {
  const style = {
    padding: "5px",
    marginBottom: "5px",
    border: "1px solid",
  };

  const handleClickLike = (blog) => {
    handleLikeBlog(blog);
  };

  return (
    <div style={style}>
      {blog.title} {blog.author}{" "}
      <Togglable buttonLabel="view" closeLabel="hide" buttonLocation="same">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleClickLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </Togglable>
    </div>
  );
};

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
    const blogLiked = {
      ...blog,
      likes: blog.likes + 1,
    };

    const updatedBlog = await blogService.updateObject(blogLiked);
    setBlogs(
      blogs
        .map((b) => (b.id === blogLiked.id ? updatedBlog : b))
        .sort((a, b) => sortBlogsByLikes(a, b))
    );
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
          return <Blog key={b.id} blog={b} handleLikeBlog={handleLikeBlog} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
