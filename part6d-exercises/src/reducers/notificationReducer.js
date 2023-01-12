import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const runNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time);
  };
};

export default notificationSlice.reducer;
