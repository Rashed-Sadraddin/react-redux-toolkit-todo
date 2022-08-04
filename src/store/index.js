import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    todo: todosReducer,
    users: usersSlice,
    
  },
});

export default store;
