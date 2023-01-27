import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { createBlog } from "../../reducers/blogReducer";
import { StyledForm } from "../StyledComponents/Form/Form.styles";
import { StyledButton } from "../StyledComponents/Button/Button.styles";

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

  return (
    <StyledForm onSubmit={handleAddBlog}>
      <div>
        <label>title: </label>
        <input {...title} />
      </div>
      <div>
        <label>author: </label>
        <input {...author} />
      </div>
      <div>
        <label>url: </label>
        <input {...url} />
      </div>
      <StyledButton>create</StyledButton>
    </StyledForm>
  );
};

export default BlogForm;
