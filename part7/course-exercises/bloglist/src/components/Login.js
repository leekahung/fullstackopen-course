import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/loggeduserReducer";
import { StyledButton } from "./StyledComponents/Button/Button.styles";
import { StyledForm } from "./StyledComponents/Form/Form.styles";

const Login = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { clearValue: clearUsername, ...username } = useField("text");
  const { clearValue: clearPassword, ...password } = useField("text");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: username.value,
        password: password.value,
      })
    );
    clearUsername();
    clearPassword();
  };

  return (
    <>
      {!loggedUser.token ? (
        <>
          <h2>Login</h2>
          <StyledForm onSubmit={handleLogin}>
            <div>
              <label>username: </label>
              <input {...username} />
            </div>
            <div>
              <label>password: </label>
              <input {...password} />
            </div>
            <StyledButton>login</StyledButton>
          </StyledForm>
        </>
      ) : null}
    </>
  );
};

export default Login;
