import { useEffect, useState } from "react";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const initialLoginValues = {
    username: "",
    password: "",
  };

  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginValues = (event) => {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.loginUser(loginValues);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setLoginValues(initialLoginValues);
      setNotification(`${user.name} logged in`);
    } catch (exception) {
      setNotification("Invalid username or password");
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setNotification("");
  };

  return (
    <div className="App">
      {!user ? (
        <>
          <h1>log in to application</h1>
          <Notification notification={notification} />
          <Login
            user={user}
            loginValues={loginValues}
            handleLogin={handleLogin}
            handleLoginValues={handleLoginValues}
          />
        </>
      ) : (
        <>
          <h1>blogs</h1>
          <Notification notification={notification} />
          <Login user={user} handleLogout={handleLogout} />
          <Blogs />
        </>
      )}
    </div>
  );
};

export default App;
