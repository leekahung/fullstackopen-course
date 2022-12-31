import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
  const [blogValues, setBlogValues] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogValues = (event) => {
    setBlogValues({
      ...blogValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: blogValues.title,
      author: blogValues.author,
      url: blogValues.url,
    };

    handleAddBlog(newBlog);
    setBlogValues({
      title: "",
      author: "",
      url: "",
    });
  };

  const cancelButtonStyles = {
    margin: "10px 0",
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={submitBlog}>
        <div>
          <label>title: </label>
          <input
            name="title"
            value={blogValues.title}
            onChange={handleBlogValues}
            placeholder="New blog title"
          />
        </div>
        <div>
          <label>author: </label>
          <input
            name="author"
            value={blogValues.author}
            onChange={handleBlogValues}
            placeholder="New blog author"
          />
        </div>
        <div>
          <label>url: </label>
          <input
            name="url"
            value={blogValues.url}
            onChange={handleBlogValues}
            placeholder="New blog url"
          />
        </div>
        <button style={cancelButtonStyles}>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
