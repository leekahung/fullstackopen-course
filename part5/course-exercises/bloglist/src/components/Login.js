import PropTypes from "prop-types";

const Login = ({ loginValues, handleLogin, handleLoginValues }) => {
  const buttonStyle = {
    margin: "10px 0",
  };

  return (
    <form onSubmit={handleLogin}>
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
          name="password"
          value={loginValues.password}
          onChange={handleLoginValues}
        />
      </div>
      <button id="login-btn" style={buttonStyle}>
        login
      </button>
    </form>
  );
};

Login.propTypes = {
  loginValues: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLoginValues: PropTypes.func.isRequired,
};

export default Login;
