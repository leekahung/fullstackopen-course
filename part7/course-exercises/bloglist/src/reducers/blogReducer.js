import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { runNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    voteBlog(state, action) {
      const id = action.payload.id;
      return state.map((b) => (b.id === id ? action.payload : b));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { setBlogs, addBlog, voteBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  };
};

export const createBlog = (objectToAdd) => {
  return async (dispatch) => {
    try {
      const blogObject = await blogService.createNew(objectToAdd);
      dispatch(addBlog(blogObject));
      dispatch(
        runNotification(
          `New blog "${blogObject.title}" by ${blogObject.author} is added!`,
          5
        )
      );
    } catch (error) {
      if (error.response.data.error.includes("TokenExpiredError")) {
        window.localStorage.removeItem("loggedUser");
        window.location.reload();
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else if (error.response.data.error.includes("JsonWebTokenError")) {
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else {
        dispatch(runNotification("Only users with valid token can post", 5));
      }
    }
  };
};

export const upvoteBlog = (objectToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedObject = await blogService.updateObject(objectToUpdate);
      dispatch(voteBlog(updatedObject));
      dispatch(
        runNotification(
          `You liked blog "${updatedObject.title}" by ${updatedObject.author}!`,
          5
        )
      );
    } catch (error) {
      if (error.response.data.error.includes("TokenExpiredError")) {
        window.localStorage.removeItem("loggedUser");
        window.location.reload();
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else if (error.response.data.error.includes("JsonWebTokenError")) {
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else {
        dispatch(runNotification("Only users can like existing posts", 5));
      }
    }
  };
};

export const removeBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      await blogService.removeObject(id);
      dispatch(deleteBlog(id));
      dispatch(
        runNotification(
          `Blog "${blog.title}" by ${blog.author} has been removed`,
          5
        )
      );
    } catch (error) {
      if (error.response.data.error.includes("TokenExpiredError")) {
        window.localStorage.removeItem("loggedUser");
        window.location.reload();
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else if (error.response.data.error.includes("JsonWebTokenError")) {
        dispatch(
          runNotification(
            `${error.response.data.error}, please log back in for a new token`,
            5
          )
        );
      } else {
        dispatch(
          runNotification("Only original post user can delete this message", 5)
        );
      }
    }
  };
};

export default blogSlice.reducer;
