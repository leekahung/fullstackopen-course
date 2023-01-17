import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((returnedBlogs) => {
      setBlogs(returnedBlogs);
    });
  }, []);

  return (
    <div>
      {blogs.map((b) => {
        return <Blog key={b.id} blog={b} />;
      })}
    </div>
  );
};

export default Blogs;
