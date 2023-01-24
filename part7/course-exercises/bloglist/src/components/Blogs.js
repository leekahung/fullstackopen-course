import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { upvoteBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const style = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid",
  };

  const styleDelete = {
    marginTop: "2px",
  };

  const handleVoteBlog = (blog) => {
    dispatch(upvoteBlog(blog));
  };

  const handleDeleteBlog = (id, blog) => {
    dispatch(removeBlog(id, blog));
  };

  return (
    <div style={style}>
      {blog.title} {blog.author}{" "}
      <Togglable buttonLabel="view" closeLabel="close" buttonLocation="top">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleVoteBlog(blog)}>like</button>
        </div>
        <button
          style={styleDelete}
          onClick={() => handleDeleteBlog(blog.id, blog)}
        >
          delete
        </button>
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
