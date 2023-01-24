import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import userService from "../services/users";
import { runNotification } from "./notificationReducer";

const initialState = {
  username: "",
  name: "",
  token: "",
  id: "",
};

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    clearLoggedUser() {
      return initialState;
    },
  },
});

export const { setLoggedUser, clearLoggedUser } = loggedUserSlice.actions;

export const initializeLoggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON);
      const status = await userService.checkToken(
        localUser.id,
        localUser.token
      );

      if (status === 200) {
        dispatch(setLoggedUser(localUser));
        blogService.setToken(localUser.token);
      } else {
        dispatch(runNotification("Mismatched tokens", 5));
        const localUser = JSON.parse(loggedUserJSON);
        dispatch(logout(localUser));
      }
    }
  };
};

export const login = (loginCredentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.loginUser(loginCredentials);
      dispatch(
        setLoggedUser({
          username: user.username,
          name: user.name,
          token: user.token,
          id: user.id,
        })
      );
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (error) {
      dispatch(runNotification("Invalid username or password", 5));
    }
  };
};

export const logout = (user) => {
  return async (dispatch) => {
    await userService.updateObject(user.id);
    dispatch(clearLoggedUser());
    window.localStorage.removeItem("loggedUser");
    dispatch(runNotification(`${user.name} logged out`, 5));
  };
};

export default loggedUserSlice.reducer;
