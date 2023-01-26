import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { upvoteBlog, commentBlog } from "../../reducers/blogReducer";

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch();
  const { clearValue, ...comment } = useField("text");
  const handleVoteBlog = (blog) => {
    dispatch(upvoteBlog(blog));
  };

  if (!blog) {
    return null;
  }

  const handleAddComment = (event) => {
    event.preventDefault();
    const blogComment = {
      comment: comment.value,
    };
    dispatch(commentBlog(blog.id, blogComment));
    clearValue();
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href=".">{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleVoteBlog(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input {...comment} /> <button>add comment</button>
      </form>
      <ul>
        {blog.comments
          ? blog.comments.map((comment, index) => {
              return <li key={index}>{comment}</li>;
            })
          : null}
      </ul>
    </div>
  );
};

export default BlogInfo;
