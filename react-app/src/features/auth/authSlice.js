import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    isAuth(state) {
      return true;
    },
    notAuth: (state) => false,
    resetAuth(state) {
      state = false;
      return state;
    },
  },
});

export const { isAuth, notAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
