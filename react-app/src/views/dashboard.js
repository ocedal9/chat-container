import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { PrimarySearchAppBar as Topdrawer } from "../components/Topdrawer";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import SimpleExpansionPanel from "../components/Exppanel";
import MainContent from "../components/MainContent";
import { GET_USERS, GET_ROOMS } from "../graphql/queries";
// import { GET_CONTACTS } from "../graphql/queries";
// import { setcontacts } from "../features/contacts/contactsSlice";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { setallusers, addAllUsers } from "../features/user/allUsersSlice";
import { pushnoti } from "../features/notifications/notiSlice";
import { setRooms, addRoom } from "../features/rooms/roomsSlice";
import io from "socket.io-client";
import { addcontact } from "../features/contacts/contactsSlice";
import { socketn } from "./SignUp";

export const socket = io(
  "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/convsock",
  {
    path: "/convsock/socket.io",
  }
);
// export const socket = io.connect("http://localhost:8000", {
// path: "/convsock/socket.io",
// });

const darktheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#61dafb",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },

    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  // const useStyles = createMuiTheme({
  //   palette: {
  //     type: "dark",
  //   },
  root: {
    flexGrow: 1,
    height: "100%",
  },

  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.primary,
    // height: "calc(100%-0px)",
    height: "91vh",
  },
  exppanel: {
    height: "91vh",
    overflow: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    // display: flex,
    // align-items: center,
  },
  // leftdrawer: {
  //   padding: theme.spacing(7),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  item: {
    color: "#61dafb",
    padding: "10px, 30px",
  },
  icon: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  // submit: {
  // margin: theme.spacing(3, 0, 2),
  // },
}));
// function getting_user() {
// }
// export const UsersContext = React.createContext();
// export const UserClientContext = React.createContext();

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const state = useSelector((state) => state)
  // const userId = state.user.
  const userId = useSelector((state) => state.user.profile.id);
  socketn.emit("createroom", userId);
  socket.emit("roomsReq", userId);

  const { loading, error } = useQuery(GET_USERS, {
    onCompleted(data) {
      // console.log("refetching", data);
      dispatch(setallusers(data.getallusers));
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    const listener = (msg) => {
      // console.log("where i want", msg);
      // updateQuery();
      dispatch(addAllUsers(msg));
    };
    socketn.on("broadcast", listener);
    return () => {
      socketn.off("broadcast", listener);
    };
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      // emisorId = msg.contact;
      // console.log(msg);

      dispatch(addRoom(msg));
    };
    socketn.on("newgroup", listener);
    return () => {
      socketn.off("newgroup", listener);
    };
  }, []);

  useEffect(() => {
    const listener = ({ id, nick }) => {
      // emisorId = msg.contact;
      // console.log(msg);
      dispatch(addcontact({ id, nick }));
    };
    socketn.on("addcon", listener);
    return () => {
      socketn.off("addcon", listener);
    };
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      // emisorId = msg.contact;
      // console.log(msg);
      dispatch(addRoom(msg.createRoom));
      // dispatch(addcontact({ id, nick }));
    };
    socketn.on("addroom", listener);
    return () => {
      socketn.off("addroom", listener);
    };
  }, []);
  // console.log(emisorId);

  useEffect(() => {
    const listener = (msg) => {
      // asdf();

      // console.log(msg);
      dispatch(pushnoti(msg));
    };
    socketn.on("reqserver", listener);
    return () => {
      // console.log("siregresa");
      socketn.off("reqserver", listener);
      // qwer();
    };
  }, []);

  // console.log("in dashboard all users", data, loading, error);
  // useEffect(() => {
  useQuery(GET_ROOMS, {
    onCompleted(data1) {
      // console.log(data1);
      if (data1.listRooms.length) {
        dispatch(setRooms(data1.listRooms));
      }
    },
  });

  // console.log("getting rooms", data1, loading1, error1);

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  return (
    // <UsersContext.Provider value={usarray}>
    <ThemeProvider theme={darktheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Grid
          container
          justify="space-between"
          spacing={0}
          alignItems="stretch"
          // className={classes.root}
        >
          <Grid item xs={12}>
            <Topdrawer />
          </Grid>
          <Grid item xs={2} className={classes.exppanel}>
            <SimpleExpansionPanel />
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <MainContent />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
    // </UsersContext.Provider>
  );
}
