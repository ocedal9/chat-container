import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import allUsersReducer from "../features/user/allUsersSlice";
import searchReducer from "../features/search/searchSlice";
import contReducer from "../features/contacts/contactsSlice";
import notiReducer from "../features/notifications/notiSlice";
import messageReducer from "../features/messages/messageSlice";
import roomsReducer from "../features/rooms/roomsSlice";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  allusers: allUsersReducer,
  search: searchReducer,
  contacts: contReducer,
  notifications: notiReducer,
  messages: messageReducer,
  rooms: roomsReducer,
});
