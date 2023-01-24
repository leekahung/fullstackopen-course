import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload;
    },
    addUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers, addUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAll();
    dispatch(setUsers(allUsers));
  };
};

export const createUser = (userObject) => {
  return async (dispatch) => {
    const newUser = await userService.createNew(userObject);
    dispatch(addUser(newUser));
  };
};

export default userSlice.reducer;
