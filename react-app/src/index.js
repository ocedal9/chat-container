import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
// import { AuthComponent } from "./utils/Auth";
import rootReducer from "./reducers";
// import { useSelector, useDispatch } from "react-redux";
// import { GET_USER } from "./graphql/queries";
// import { isAuth, notAuth } from "./features/auth/authSlice";
// import { setuser } from "./features/user/userSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

ReactDOM.render(
  // const cook = document.cookie
  // console.log(cook)

  <Provider store={store}>
    {/* <AuthComponent> */}
    <App />
    {/* </AuthComponent> */}
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
