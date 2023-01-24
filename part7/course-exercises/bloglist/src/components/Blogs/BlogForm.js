import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { createBlog } from "../../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const { clearValue: clearTitle, ...title } = useField("text");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearUrl, ...url } = useField("text");

  const handleAddBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );
    clearTitle();
    clearAuthor();
    clearUrl();
    if (blogFormRef) {
      blogFormRef.current.toggleVisibility();
    }
  };

  const style = {
    margin: "5px 0",
  };

  const buttonStyle = {
    margin: "5px 0 10px",
  };

  return (
    <form onSubmit={handleAddBlog}>
      <div style={style}>
        <label>title: </label>
        <input {...title} />
      </div>
      <div style={style}>
        <label>author: </label>
        <input {...author} />
      </div>
      <div style={style}>
        <label>url: </label>
        <input {...url} />
      </div>
      <button style={buttonStyle}>create</button>
    </form>
  );
};

export default BlogForm;
