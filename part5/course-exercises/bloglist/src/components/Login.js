const Login = ({
  user,
  handleLogout,
  loginValues,
  handleLogin,
  handleLoginValues,
}) => {
  const buttonStyle = {
    margin: "10px 0",
  };

  return !user ? (
    <>
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
        <button style={buttonStyle}>login</button>
      </form>
    </>
  ) : (
    <button style={buttonStyle} onClick={handleLogout}>
      logout
    </button>
  );
};

export default Login;
