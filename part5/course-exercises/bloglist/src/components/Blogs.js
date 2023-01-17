import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
};

const Blogs = ({ user, runNotifications }) => {
  const [blogs, setBlogs] = useState([]);

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
  };

  return (
    <>
      <h1>create new</h1>
      <BlogForm
        handleAddBlog={handleAddBlog}
        runNotifications={runNotifications}
      />
      <div>
        {blogs.map((b) => {
          return <Blog key={b.id} blog={b} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
