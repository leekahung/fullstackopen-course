import { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import blogServices from "./services/blogs";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState("");
  const [notificationType, setNotificationType] = useState(null);
  const blogFormRef = useRef();

  const sortBlogsByLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes;
  };

  useEffect(() => {
    if (user) {
      blogServices.getAll().then((returnedBlogs) => {
        setBlogs(returnedBlogs.sort((a, b) => sortBlogsByLikes(a, b)));
      });
    }
  }, [user]);

  console.log(blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const notificationStyles = {
    general: {
      backgroundColor: "lightgrey",
      padding: "10px",
      borderRadius: "5px",
      margin: "10px 0",
    },
    error: {
      color: "red",
      border: "2px solid red",
    },
    message: {
      color: "green",
      border: "2px solid green",
    },
  };

  const notificationMessage = {
    ...notificationStyles.general,
    ...notificationStyles.message,
  };

  const notificationError = {
    ...notificationStyles.general,
    ...notificationStyles.error,
  };

  const notificationTimeout = (time, auxFunc = function () {}) => {
    setTimeout(() => {
      setNotificationType(null);
      setNotifications(null);
      auxFunc();
    }, time);
  };

  const handleLogin = async (loginCredentials) => {
    try {
      const user = await loginService.login(loginCredentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      blogServices.setToken(user.token);
      setUser(user);
      setNotificationType(notificationMessage);
      setNotifications(`${user.name} logged in`);
      notificationTimeout(5000);
    } catch (exception) {
      setNotificationType(notificationError);
      setNotifications("Wrong username or password");
      notificationTimeout(5000);
    }
  };

  const handleLogout = () => {
    const name = JSON.parse(window.localStorage.loggedUser).name;
    setNotificationType(notificationMessage);
    setNotifications(`${name} logging out...`);
    notificationTimeout(2000, window.location.reload());
    window.localStorage.removeItem("loggedUser");
  };

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlogPost = await blogServices.create(blogObject);
      setBlogs(blogs.concat(newBlogPost));
      setNotificationType(notificationMessage);
      setNotifications(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      notificationTimeout(5000);
    } catch (exception) {
      setNotificationType(notificationError);
      setNotifications("All fields must to be filled");
      notificationTimeout(5000);
    }
  };

  const handleLikeBlog = async (id, blogObject) => {
    const updatedBlogLikes = await blogServices.update(id, blogObject);
    setBlogs(
      blogs
        .map((b) => (b.id !== id ? b : updatedBlogLikes))
        .sort((a, b) => sortBlogsByLikes(a, b))
    );
    setNotificationType(notificationMessage);
    setNotifications(`Blog ${updatedBlogLikes.title} liked`);
    notificationTimeout(5000);
  };

  const handleDeleteBlog = async (id) => {
    try {
      const deletedBlog = blogs.find((b) => b.id === id);
      await blogServices.remove(id);

      setNotificationType(notificationMessage);
      setNotifications(`Blog ${deletedBlog.title} deleted`);
      notificationTimeout(5000);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (exception) {
      setNotificationType(notificationError);
      setNotifications("Only original poster can delete this blog post");
      notificationTimeout(5000);
    }
  };

  const logoutStyles = {
    margin: "10px 0",
  };

  const blogListStyles = {
    listStyle: "none",
    listStylePosition: "inside",
    paddingLeft: "0",
  };

  return (
    <div className="App">
      {user === null ? (
        <>
          <h1>log in to application</h1>
          <div style={notificationType}>{notifications}</div>
          <Login handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h1>blogs</h1>
          <div style={notificationType}>{notifications}</div>
          <div>{`user: ${user.name}`}</div>
          <button style={logoutStyles} onClick={() => handleLogout()}>
            Logout
          </button>
          <Togglable
            buttonLabel="create new blog"
            closeButtonLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          <ul className="blog-list" style={blogListStyles}>
            <Blogs
              blogs={blogs}
              handleLikeBlog={handleLikeBlog}
              handleDeleteBlog={handleDeleteBlog}
            />
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
