import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { login } from "../reducers/loggeduserReducer";

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

  const style = {
    margin: "10px 0",
  };

  return (
    <>
      {!loggedUser.token ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>username: </label>
              <input {...username} />
            </div>
            <div>
              <label>password: </label>
              <input {...password} />
            </div>
            <button style={style}>login</button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default Login;
