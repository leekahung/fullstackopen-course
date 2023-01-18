const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification,
  };
};

export const runNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time);
  };
};

export default notificationReducer;
