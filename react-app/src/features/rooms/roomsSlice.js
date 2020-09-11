import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: [],
  reducers: {
    setRooms(state, action) {
      const rooms = action.payload;
      return rooms;
    },
    addRoom(state, action) {
      // console.log("ind slice addRoom");
      state.push(action.payload);
    },
    resetRooms(state) {
      state = [];
      return state;
    },
  },
});

export const { setRooms, resetRooms, addRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
