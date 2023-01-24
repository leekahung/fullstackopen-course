import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs/Blogs";
import Users from "./components/Users/Users";
import Notifications from "./components/Notifications";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser } from "./reducers/loggeduserReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
    dispatch(initializeLoggedUser());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>blogs</h1>
      <Notifications />
      <Login />
      <Blogs />
      <Users />
    </div>
  );
};

export default App;
