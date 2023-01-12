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
        state.message = action.payload.message;
        state.timeoutID = action.payload.timeoutID;
      } else {
        return action.payload;
      }
    },
    clearNotification(_state, _action) {
      return initialState;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const runNotification = (message, time) => {
  return async (dispatch) => {
    const timeoutID = setTimeout(() => dispatch(clearNotification()), time);
    const notification = {
      message,
      timeoutID,
    };
    dispatch(setNotification(notification));
  };
};

export default notificationSlice.reducer;
