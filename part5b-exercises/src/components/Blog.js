import ToggableBlog from "./ToggableBlog";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const runLikeBlog = async (event) => {
    event.preventDefault();
    const likeBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    handleLikeBlog(blog.id, likeBlog);
  };

  const runDeleteBlog = async (event) => {
    event.preventDefault();
    handleDeleteBlog(blog.id);
  };

  const blogStyles = {
    marginBottom: "5px",
    border: "1px solid",
    padding: "10px",
  };

  return (
    <div style={blogStyles}>
      {blog.title} {blog.author}{" "}
      <ToggableBlog buttonLabel="view" closeButtonLabel="hide">
        <div>
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={runLikeBlog}>like</button>
          <br />
          {blog.author}
          <br />
          <button onClick={runDeleteBlog}>remove</button>
        </div>
      </ToggableBlog>
    </div>
  );
};

export default Blog;
