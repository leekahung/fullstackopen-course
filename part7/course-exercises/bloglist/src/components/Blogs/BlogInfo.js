import { useDispatch } from "react-redux";
import { upvoteBlog } from "../../reducers/blogReducer";

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch();
  const handleVoteBlog = (blog) => {
    dispatch(upvoteBlog(blog));
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href=".">{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleVoteBlog(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default BlogInfo;
