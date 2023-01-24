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
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  };
};

// Exercise 7.11
export const createBlog = (objectToAdd) => {
  return async (dispatch) => {
    const blogObject = await blogService.createNew(objectToAdd);
    dispatch(addBlog(blogObject));
    dispatch(
      runNotification(
        `New blog "${blogObject.title}" by ${blogObject.author} is added!`,
        5
      )
    );
  };
};

export default blogSlice.reducer;
