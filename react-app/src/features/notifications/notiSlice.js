import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    setallnotis(state, action) {
      const notis = action.payload;
      return notis;
    },
    deleteNoti(state, action) {
      state = state.filter((noti) => noti.id !== action.payload);
      return state;
    },
    pushnoti(state, action) {
      state.push(action.payload);
    },
    resetNoti(state) {
      state = [];
      return state;
    },
  },
});

export const {
  setallnotis,
  deleteNoti,
  pushnoti,
  resetNoti,
} = notiSlice.actions;
export default notiSlice.reducer;
