import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessage(state, action) {
      state.push(action.payload);
    },
    setMessageFirst(state, action) {
      // console.log("in messages slice");
      state = action.payload;
      // console.log(state);
      return state;
    },
    resetMessages(state) {
      state = [];
      // console.log("reseting", state);
      return state;
    },
  },
});

export const {
  setMessage,
  setMessageFirst,
  resetMessages,
} = messageSlice.actions;
export default messageSlice.reducer;
