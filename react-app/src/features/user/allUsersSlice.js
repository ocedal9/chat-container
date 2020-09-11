import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allusers",
  initialState: {},
  reducers: {
    setallusers(state, action) {
      const users = action.payload;
      // console.log("inSlice");
      return users;
    },
    addAllUsers(state, action) {
      state.push(action.payload);
    },
    resetAllUsers(state) {
      state = [];
      return state;
    },
  },
});

export const {
  setallusers,
  resetAllUsers,
  addAllUsers,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
