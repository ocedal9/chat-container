import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setuser(state, action) {
      const user = action.payload;
      state.profile = {};
      state.profile.id = user.id;
      state.profile.nickname = user.nickname;
      state.profile.fullname = user.fullname;
      state.profile.email = user.email;
    },
    resetUser(state) {
      state = {};
      return {};
    },
  },
});

export const { setuser, resetUser } = userSlice.actions;

export default userSlice.reducer;
