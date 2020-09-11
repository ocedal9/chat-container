import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setMessageFirst } from "../features/messages/messageSlice";
import { CREATE_MESSAGE, GET_MESSAGES } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { socket } from "../views/dashboard";

const darktheme = createMuiTheme({
  palette: {
    primary: {
      main: "#61dafb",
      //   main: "#5e5452",
    },

    secondary: {
      main: "#5e5452",
    },

    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(1),
    width: "77vw",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "inline",
  },
  button: {
    background: "linear-gradient(45deg, #0288d1 30%, #b3e5fc 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: "40px",
    width: "77vw",
    padding: "10px 50px",
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    height: "100%",
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: "black",
    backgroundColor: "#8c8887",
    height: "70vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
  },
  paper2: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: "black",
    backgroundColor: "#cbbfbc",
    height: "20px",
    width: "65vw",
  },
  exppanel: {
    height: "91vh",
    overflow: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  item: {
    color: "#61dafb",
    padding: "10px, 30px",
  },
  icon: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  cont: {
    content: "",
    // display: "table",
    clear: "both",
    float: "left",
    margin: "5px",
    width: "60vw",
    // overflow: "hidden",
  },
  message: {
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    width: "70vw",
    display: "table",
    clear: "both",
    float: "left",
    margin: "5px",
    padding: "2px 2px 2px 25px",
  },
}));

export default function MCchatbox(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [qwer2] = useMutation(GET_MESSAGES, {
    onCompleted(data) {
      const mesArr = [];
      for (const messag of data.getMessages) {
        const owner = state.allusers.find(
          (element) => element.id === messag.owner
        );
        const mesObj = messag;
        mesObj.ownerNick = owner.nickname;
        mesArr.push(mesObj);
      }
      dispatch(setMessageFirst(mesArr));
    },
  });
  const membersArray = state.rooms;

  let convId = false;
  if (props.location.state && props.location.state.user) {
    const userConvId = props.location.state.user.id;

    const found = membersArray.filter(
      (room) => room.type === "1v1" && room.members.includes(userConvId)
    );
    convId = found[0].id;
  } else if (props.location.state && props.location.state.group) {
    convId = props.location.state.group.id;
  }
  const getmesi = {};
  getmesi.roomId = convId;

  const [qwer] = useMutation(CREATE_MESSAGE, {
    onCompleted(data) {
      const msgObj = data.createMessage;
      socket.emit("message", { msg: msgObj });
    },
  });
  useEffect(() => {
    qwer2({ variables: { getmesi } });
  }, []);

  useEffect(() => {
    const listener = (msg) => {
      const msgCom = msg;
      // console.log(msg);
      const owner2 = state.allusers.find((element) => element.id === msg.owner);

      msgCom.ownerNick = owner2.nickname;

      if (convId === msgCom.roomId) {
        dispatch(setMessage(msgCom));
      }
    };
    socket.on("msgserver", listener);
    return () => {
      socket.off("msgserver", listener);
    };
  }, []);
  const messa = state.messages;

  const sendmsg = function (e) {
    e.preventDefault();
    const msgString = e.target.elements.message.value;
    e.target.elements.message.value = "";
    const messagei = {};
    messagei.content = msgString;
    messagei.owner = state.user.profile.id;
    messagei.createdAt = new Date().toString();
    messagei.roomId = convId;
    qwer({ variables: { messagei } });
  };

  return (
    <ThemeProvider theme={darktheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Grid
          container
          justify="space-between"
          spacing={1}
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {!messa ? (
                <p>No Messages</p>
              ) : (
                <div className={classes.cont}>
                  {messa.map((mes) => (
                    <div className={classes.message} key={mes.id}>
                      <p>From: {mes.ownerNick}</p>
                      <p>{mes.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </Paper>
          </Grid>

          <form className={classes.form} noValidate onSubmit={sendmsg}>
            <Grid item xs={2}>
              <TextField
                className={classes.text}
                variant="outlined"
                margin="normal"
                id="message"
                label="Type here"
                name="message"
                placeholder="Write message here..."
                autoComplete="off"
                autoFocus
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                style={{ color: "black" }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                // href="./dashboard"
              >
                Send
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
