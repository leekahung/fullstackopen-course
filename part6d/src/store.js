import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import noteReducer from "./reducers/noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filters: filterReducer,
  },
});

export default store;
