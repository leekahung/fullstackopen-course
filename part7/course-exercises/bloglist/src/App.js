import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import Notifications from "./components/Notifications";
import { initializeBlogs } from "./reducers/blogReducer";
import Togglable from "./components/Togglable";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>blogs</h1>
      <Togglable buttonLabel="create new blog">
        <h2>create new blog</h2>
        <BlogForm />
      </Togglable>
      <Notifications />
      <Blogs />
    </div>
  );
};

export default App;
