import { useSelector } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Blog = ({ blog }) => {
  const style = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid",
  };
  return (
    <div style={style}>
      {blog.title} {blog.author}{" "}
      <Togglable buttonLabel="view" closeLabel="close" buttonLocation="top">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <button>delete</button>
      </Togglable>
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new blog</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map((b) => {
        return <Blog key={b.id} blog={b} />;
      })}
    </>
  );
};

export default Blogs;
