import { useEffect, useState } from "react";
import Login from "./components/Login";
import Notifications from "./components/Notifications";
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
  const [userNotifications, setUserNotifications] = useState("");
  const [notifications, setNotifications] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setUserNotifications(`${user.name} logged in`);
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
      setUserNotifications(`${user.name} logged in`);
    } catch (exception) {
      setUserNotifications("Invalid username or password");
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setUserNotifications("");
  };

  const runNotifications = (message, time) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      setNotifications(message);
    }
    const timeout = setTimeout(() => setNotifications(""), time);
    setNotifications(message);
    setTimeoutID(timeout);
  };

  return (
    <div className="App">
      {!user ? (
        <>
          <h1>log in to application</h1>
          <Notifications
            notifications={notifications}
            userNotifications={userNotifications}
          />
          <Login
            loginValues={loginValues}
            handleLogin={handleLogin}
            handleLoginValues={handleLoginValues}
          />
        </>
      ) : (
        <>
          <h1>blogs</h1>
          <Notifications
            notifications={notifications}
            userNotifications={userNotifications}
            handleLogout={handleLogout}
          />
          <Blogs user={user} runNotifications={runNotifications} />
        </>
      )}
    </div>
  );
};

export default App;
