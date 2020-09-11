import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: false,
  reducers: {
    setSearch: (state, action) => {
      return action.payload;
    },
    resetSearch(state) {
      state = "";
      return state;
    },
  },
});

export const {
  inSearch,
  outSearch,
  setSearch,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
