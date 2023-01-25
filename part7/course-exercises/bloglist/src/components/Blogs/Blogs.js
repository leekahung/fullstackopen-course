import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "../Togglable";
import BlogForm from "./BlogForm";
import { removeBlog } from "../../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const style = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid",
  };

  const styleDelete = {
    marginTop: "2px",
  };

  const handleDeleteBlog = (id, blog) => {
    dispatch(removeBlog(id, blog));
  };

  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>{" "}
      {loggedUser.token ? (
        <button
          style={styleDelete}
          onClick={() => handleDeleteBlog(blog.id, blog)}
        >
          delete
        </button>
      ) : null}
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogFormRef = useRef();

  return (
    <>
      {loggedUser.token ? (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <h2>create new blog</h2>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      ) : null}
      {blogs.map((b) => {
        return <Blog key={b.id} blog={b} />;
      })}
    </>
  );
};

export default Blogs;
