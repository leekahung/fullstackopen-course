import Togglable from "./Togglable";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const style = {
    padding: "5px",
    marginBottom: "5px",
    border: "1px solid",
  };

  const handleClickLike = (blog) => {
    handleLikeBlog(blog);
  };

  const handleClickDelete = (blog) => {
    handleDeleteBlog(blog);
  };

  return (
    <div className="blog-info" style={style}>
      {blog.title} {blog.author}{" "}
      <Togglable buttonLabel="view" closeLabel="hide" buttonLocation="same">
        <div className="blog-url">{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleClickLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => handleClickDelete(blog)}>delete</button>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func,
  handleDeleteBlog: PropTypes.func,
};

export default Blog;
