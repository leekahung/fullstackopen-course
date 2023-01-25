import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs/Blogs";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Notifications from "./components/Notifications";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser } from "./reducers/loggeduserReducer";
import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    dispatch(initializeLoggedUser());
  }, [dispatch]);

  const match = useMatch("/users/:id");
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  return (
    <>
      <div className="App">
        <h1>blogs</h1>
        <Notifications />
        <Login />
      </div>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </>
  );
};

export default App;
