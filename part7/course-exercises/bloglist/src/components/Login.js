import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { login, logout } from "../reducers/loggeduserReducer";

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

  const handleLogout = (user) => {
    dispatch(logout(user));
  };

  return (
    <>
      {!loggedUser.token ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>username: </label>
            <input {...username} />
          </div>
          <div>
            <label>password: </label>
            <input {...password} />
          </div>
          <button>login</button>
        </form>
      ) : (
        <>
          <div>{loggedUser.name} logged in</div>
          <button onClick={() => handleLogout(loggedUser)}>logout</button>
        </>
      )}
    </>
  );
};

export default Login;
