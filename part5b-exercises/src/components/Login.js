import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const handleLoginValues = (event) => {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitLogin = (event) => {
    event.preventDefault();

    handleLogin(loginValues);
    setLoginValues({
      username: "",
      password: "",
    });
  };

  const loginStyles = {
    margin: "10px 0",
  };

  return (
    <div style={loginStyles}>
      <form onSubmit={submitLogin}>
        <div>
          <div>
            <label>username </label>
            <input
              name="username"
              value={loginValues.username}
              onChange={handleLoginValues}
            />
          </div>
          <div>
            <label>password </label>
            <input
              type="password"
              name="password"
              value={loginValues.password}
              onChange={handleLoginValues}
            />
          </div>
          <button style={loginStyles}>login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
