import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.unshift({
        id: Math.round(Math.random() * 10000000),
        text: action.payload,
      });
    },
  },
});
export const { addUser } = userReducer.actions;

export default userReducer.reducer;
