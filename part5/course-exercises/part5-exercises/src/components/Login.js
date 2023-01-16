const Login = ({ handleLogin, loginValues, handleLoginValues }) => {
  const loginStyles = {
    margin: "10px 0",
  };

  return (
    <div style={loginStyles}>
      <form onSubmit={handleLogin}>
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
