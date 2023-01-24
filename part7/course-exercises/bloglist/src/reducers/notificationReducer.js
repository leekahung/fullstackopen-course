import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  timeoutID: "",
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      if (state.timeoutID !== "") {
        clearTimeout(state.timeoutID);
      }
      state.message = action.payload.message;
      state.timeoutID = action.payload.timeoutID;
    },
    clearNotication() {
      return initialState;
    },
  },
});

export const { setNotification, clearNotication } = notificationSlice.actions;

export const runNotification = (message, time = 0) => {
  return async (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch(clearNotication());
    }, 1000 * time);
    const notification = {
      message,
      timeoutID,
    };
    dispatch(setNotification(notification));
  };
};

export default notificationSlice.reducer;
