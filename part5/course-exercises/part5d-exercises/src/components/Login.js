import { useState } from "react";
import PropTypes from "prop-types";

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
              className="username"
              name="username"
              value={loginValues.username}
              onChange={handleLoginValues}
            />
          </div>
          <div>
            <label>password </label>
            <input
              className="password"
              type="password"
              name="password"
              value={loginValues.password}
              onChange={handleLoginValues}
            />
          </div>
          <button className="login-button" style={loginStyles}>
            login
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
