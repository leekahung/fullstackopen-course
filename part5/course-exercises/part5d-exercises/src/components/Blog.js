import TogglableBlog from "./TogglableBlog";

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
    <li style={blogStyles}>
      <span>
        {blog.title} {blog.author}
      </span>{" "}
      <TogglableBlog buttonLabel="view" closeButtonLabel="hide">
        <div className="blog-info">
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button onClick={runLikeBlog} className="likeBtn">
            like
          </button>
          <br />
          {blog.user[0].name}
          <br />
          <button className="remove-blog" onClick={runDeleteBlog}>
            remove
          </button>
        </div>
      </TogglableBlog>
    </li>
  );
};

export default Blog;
