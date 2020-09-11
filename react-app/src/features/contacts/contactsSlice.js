import { createSlice } from "@reduxjs/toolkit";

const contSlice = createSlice({
  name: "cont",
  initialState: [],
  reducers: {
    setcontacts(state, action) {
      const contacts = action.payload;
      return contacts;
    },
    addcontact(state, action) {
      state.push(action.payload);
    },
    resetContacts(state) {
      state = [];
      return state;
    },
  },
});

export const { setcontacts, addcontact, resetContacts } = contSlice.actions;

export default contSlice.reducer;
