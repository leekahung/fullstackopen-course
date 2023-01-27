import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "../Togglable";
import BlogForm from "./BlogForm";
import { removeBlog } from "../../reducers/blogReducer";
import { StyledButton } from "../StyledComponents/Button/Button.styles";
import { StyledBlog } from "../StyledComponents/Blog/Blog.styles";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);

  const handleDeleteBlog = (id, blog) => {
    dispatch(removeBlog(id, blog));
  };

  return (
    <StyledBlog>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>{" "}
      {loggedUser.token ? <StyledButton onClick={() => handleDeleteBlog(blog.id, blog)}>delete</StyledButton> : null}
    </StyledBlog>
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
