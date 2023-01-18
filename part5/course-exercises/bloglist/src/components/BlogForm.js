import { useState } from "react";
import PropTypes from "prop-types";

const BlogInput = ({ inputName, inputValue, handleBlogForm }) => {
  return (
    <div>
      <label>{inputName}: </label>
      <input
        name={inputName}
        className={`input-${inputName}`}
        placeholder={`new ${inputName}`}
        value={inputValue}
        onChange={handleBlogForm}
      />
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
      <button className="create-blog-btn">create</button>
    </form>
  );
};

BlogInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleBlogForm: PropTypes.func.isRequired,
};

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;
