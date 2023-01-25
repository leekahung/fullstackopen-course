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
import { initializeLoggedUser } from "./reducers/loggeduserReducer";
import { Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    dispatch(initializeLoggedUser());
  }, [dispatch]);

  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((u) => u.id === matchBlog.params.id)
    : null;

  return (
    <>
      <div className="App">
        <h1>blogs</h1>
        <Notifications />
        <Login />
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
