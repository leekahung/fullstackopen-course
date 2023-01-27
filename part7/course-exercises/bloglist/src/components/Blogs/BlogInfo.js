import { useDispatch, useSelector } from "react-redux";
import { useField } from "../../hooks";
import { upvoteBlog, commentBlog } from "../../reducers/blogReducer";
import { StyledBlogInfo } from "../StyledComponents/Blog/Blog.styles";
import { StyledButton } from "../StyledComponents/Button/Button.styles";
import { StyledForm } from "../StyledComponents/Form/Form.styles";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const { clearValue, ...comment } = useField("text");

  const handleAddComment = (event) => {
    event.preventDefault();
    const blogComment = {
      comment: comment.value,
    };
    dispatch(commentBlog(blog.id, blogComment));
    clearValue();
  };

  return (
    <>
      <h3>comments</h3>
      <StyledForm onSubmit={handleAddComment} variant="comments">
        <div>
          <input {...comment} />
        </div>
        <StyledButton>add comment</StyledButton>
      </StyledForm>
      <ul>
        {blog.comments
          ? blog.comments.map((comment, index) => {
              return <li key={index}>{comment}</li>;
            })
          : null}
      </ul>
    </>
  );
};

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const handleVoteBlog = (blog) => {
    dispatch(upvoteBlog(blog));
  };

  if (!blog) {
    return null;
  }

  return (
    <StyledBlogInfo>
      <h2>{blog.title}</h2>
      <a href="." className="blog-info">
        {blog.url}
      </a>
      <div className="blog-info">
        {blog.likes} likes {loggedUser.token ? <StyledButton onClick={() => handleVoteBlog(blog)}>like</StyledButton> : null}
      </div>
      <div className="blog-info">added by {blog.user.name}</div>
      <Comments blog={blog} />
    </StyledBlogInfo>
  );
};

export default BlogInfo;
