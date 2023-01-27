import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { createUser } from "../../reducers/userReducer";
import { StyledButton } from "../StyledComponents/Button/Button.styles";
import { StyledForm } from "../StyledComponents/Form/Form.styles";

const UserForm = () => {
  const dispatch = useDispatch();

  const { clearValue: clearUsername, ...username } = useField("text");
  const { clearValue: clearName, ...name } = useField("text");
  const { clearValue: clearPassword, ...password } = useField("text");

  const handleAddUser = (event) => {
    event.preventDefault();
    dispatch(
      createUser({
        username: username.value,
        name: name.value,
        password: password.value,
      })
    );
    clearUsername();
    clearName();
    clearPassword();
  };
  return (
    <StyledForm onSubmit={handleAddUser}>
      <h2>create new user</h2>
      <div>
        <label>username: </label>
        <input {...username} />
      </div>
      <div>
        <label>name: </label>
        <input {...name} />
      </div>
      <div>
        <label>password: </label>
        <input {...password} />
      </div>
      <StyledButton>create</StyledButton>
    </StyledForm>
  );
};

export default UserForm;
