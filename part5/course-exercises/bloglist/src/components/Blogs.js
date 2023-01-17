import { useEffect, useState, useRef } from "react";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
};

const Blogs = ({ user, runNotifications }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((returnedBlogs) => {
        setBlogs(returnedBlogs);
      });
    }
  }, [user]);

  const handleAddBlog = async (blogFormValues) => {
    const newBlog = await blogService.createNew(blogFormValues);
    setBlogs(blogs.concat(newBlog));
    runNotifications(`${newBlog.title} by ${newBlog.author} added`, 5000);
    blogFormRef.current.toggleVisibility();
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
          return <Blog key={b.id} blog={b} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
