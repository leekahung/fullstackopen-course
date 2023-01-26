import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs/Blogs";
import BlogInfo from "./components/Blogs/BlogInfo";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Notifications from "./components/Notifications";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser, logout } from "./reducers/loggeduserReducer";
import { Routes, Route, useMatch, Link, useLocation } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const loggedUser = useSelector((state) => state.loggedUser);

  const location = useLocation();

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    dispatch(initializeLoggedUser());
  }, [dispatch, location.key]);

  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((u) => u.id === matchBlog.params.id)
    : null;

  const style = {
    margin: "0 5px",
  };

  const styleNavbar = {
    marginBottom: "20px",
    backgroundColor: "lightgrey",
    padding: "5px",
  };

  const handleLogout = (user) => {
    dispatch(logout(user));
  };

  return (
    <>
      <div className="App">
        <div style={styleNavbar}>
          <Link style={style} to="/">
            blogs
          </Link>
          <Link style={style} to="/users">
            users
          </Link>
          {loggedUser.token ? (
            <span style={style}>
              {loggedUser.name} logged in{" "}
              <button style={style} onClick={() => handleLogout(loggedUser)}>
                logout
              </button>
            </span>
          ) : null}
        </div>
        <Login />
        <h1>blogs</h1>
        <Notifications />
      </div>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogInfo blog={blog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </>
  );
};

export default App;
