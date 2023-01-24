import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { createUser } from "../../reducers/userReducer";

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

  const style = {
    margin: "5px 0",
  };

  const buttonStyle = {
    margin: "5px 0 10px",
  };

  return (
    <form onSubmit={handleAddUser}>
      <div style={style}>
        <label>username: </label>
        <input {...username} />
      </div>
      <div style={style}>
        <label>name: </label>
        <input {...name} />
      </div>
      <div style={style}>
        <label>password: </label>
        <input {...password} />
      </div>
      <button style={buttonStyle}>create</button>
    </form>
  );
};

export default UserForm;
