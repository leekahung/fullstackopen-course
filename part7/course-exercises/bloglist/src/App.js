import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Blogs from "./components/Blogs";
import Notifications from "./components/Notifications";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>blogs</h1>
      <Notifications />
      <Blogs />
    </div>
  );
};

export default App;
