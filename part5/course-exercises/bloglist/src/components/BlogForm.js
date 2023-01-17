import { useState } from "react";

const BlogInput = ({ inputName, inputValue, handleBlogForm }) => {
  return (
    <div>
      <label>{inputName}: </label>
      <input name={inputName} value={inputValue} onChange={handleBlogForm} />
    </div>
  );
};

const BlogForm = ({ handleAddBlog }) => {
  const initialBlogValues = {
    title: "",
    author: "",
    url: "",
  };

  const [blogFormValues, setBlogFormValues] = useState(initialBlogValues);

  const handleBlogForm = (event) => {
    setBlogFormValues({
      ...blogFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitBlog = async (event) => {
    event.preventDefault();
    handleAddBlog(blogFormValues);
    setBlogFormValues(initialBlogValues);
  };

  return (
    <form onSubmit={handleSubmitBlog}>
      {["title", "author", "url"].map((inputName) => {
        return (
          <BlogInput
            key={inputName}
            inputName={inputName}
            inputValue={blogFormValues[inputName]}
            handleBlogForm={handleBlogForm}
          />
        );
      })}
      <button>create</button>
    </form>
  );
};

export default BlogForm;
