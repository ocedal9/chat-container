import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import client from "./graphql/client";
import firstpage from "./views/firstpage";
import { SignUp } from "./views/SignUp";
import { SignIn } from "./views/login";
import Dashboard from "./views/dashboard";
import { useSelector, useDispatch } from "react-redux";
import { GET_USER } from "./graphql/queries";
import { isAuth, notAuth } from "./features/auth/authSlice";
import { setuser } from "./features/user/userSlice";

// import { AuthContext } from "./utils/Auth";
// const stateAuth = false;
function NotFoundPage() {
  return <div>404!</div>;
}

function App() {
  // console.log("in App.js");
  // stateAuth = useSelector((state) => state.auth);
  // const Auth = stateAuth;
  return (
    // const cook = document.cookie;
    //     const isTok = cook.split("=")[0];
    //     console.log(isTok);
    //     if (isTok) {
    //       dispatch(isAuth());
    //     } else {
    //       dispatch(notAuth());
    //     }
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/" component={firstpage} />
          <PublicRoute path="/signup" component={SignUp} />
          <PublicRoute path="/login/" component={SignIn} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PublicRoute component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}
// const isAuth = false;
function PublicRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();

  useQuery(GET_USER, {
    onCompleted(data) {
      // console.log(data.getuser);
      // dispatch(setuser(data.getuser));
      const cook = document.cookie;
      const isTok = cook.split("=")[0];
      // console.log(isTok);
      if (isTok) {
        // console.log("qewrerererererererer");
        dispatch(isAuth());
        dispatch(setuser(data.getuser));
      } else {
        dispatch(notAuth());
      }
    },
  });
  const Auth = useSelector((state) => state.auth);

  // console.log(isAuth);
  // console.log("is Authenticated", Auth);
  return (
    <Route
      {...rest}
      component={(props) =>
        !Auth ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  // const { isAuth } = useContext(AuthContext);

  const Auth = useSelector((state) => state.auth);

  // console.log("in PrivateRoute");
  return (
    <Route
      {...rest}
      component={(props) =>
        Auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default App;
