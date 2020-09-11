import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { CONTACT_ACC, CREATE_ROOM, DELETE } from "../graphql/mutations";
import { GET_ROOMS } from "../graphql/queries";

import { Link } from "react-router-dom";
import { deleteNoti } from "../features/notifications/notiSlice";
import { addcontact } from "../features/contacts/contactsSlice";
import { socketn } from "../views/dashboard";
// import { GET_CONTACTS, GET_USERS } from "../graphql/queries";
// import { pushnoti } from "../features/notifications/notiSlice";
// import { setallusers } from "../features/user/allUsersSlice";
// import { setcontacts } from "../features/contacts/contactsSlice";
import { addRoom } from "../features/rooms/roomsSlice";

// import io from "socket.io-client";
// const socket = io("http://localhost:4003");
// socket.on("connect", (data) => {
//   socket.on("skevent", (message) => {
//     console.log(message);
//   });
//   socket.emit("message", { data: "akdjfgkajsdgfkagfkajfg" });
// });

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #61dafb 30%, #9cdef9 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 48,
    padding: "0 30px",
    margin: theme.spacing(2, 0, 1),
  },
}));

export default function MCnoti(props) {
  // console.log(socketn);

  const classes = useStyles();
  const noti = props.location.state.noti;
  // console.log(noti);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const emisor = noti.emisor;
  // const emisorUser = state.allusers.find((user) => user.nickname === emisor);
  const acce = {};

  const emisorId = noti.emisorId;
  const emisorNick = noti.emisor;
  const contactid = {};

  contactid.id = emisorId;
  // console.log(contactid.id);
  contactid.nick = emisorNick;
  contactid.ownNick = state.user.profile.nickname;
  const contactinput = {};
  contactinput.id = emisorId;
  contactinput.nick = emisorNick;
  // let emisorId = "a";
  const userId = state.user.profile.id;
  const userNick = state.user.profile.nickname;
  acce.roomId = emisorId;
  acce.id = userId;
  acce.nick = userNick;

  // useEffect(() => {
  //   const listener = (msg) => {
  //     // emisorId = msg.contact;
  //     console.log("arriba");
  //     // dispatch(addcontact(msg));
  //   };
  //   socketn.on("addcon", listener);
  //   return () => {
  //     console.log("abajo");
  //     socketn.off("addcon", listener);
  //   };
  // }, []);
  // console.log(emisorId);

  // socketn.on("addcon", () => {
  //   console.log("prueba");
  // });

  const [qwer3] = useMutation(CONTACT_ACC, {
    onCompleted(data1) {
      // console.log("qwer3", data1);
      socketn.emit("accepted", acce);

      dispatch(addcontact(contactinput));
    },
  });

  const [qwer4] = useMutation(CREATE_ROOM, {
    onCompleted(data) {
      data.roomToJoin = emisorId;

      // console.log("qwer4 done", data);
      socketn.emit("roomsocket", data);
      dispatch(addRoom(data.createRoom));
    },
  });
  // console.log("creating rooms", data, loading);

  const [qwer5] = useMutation(DELETE, {
    onCompleted(data) {
      // console.log("qwer5", data);
      dispatch(deleteNoti(props.location.state.noti.id));
    },
  });

  const accept = function (e) {
    // e.preventDefault();
    // asdf2();

    const roomi = {};
    roomi.title = userId + "+" + emisorId;
    roomi.type = "1v1";
    roomi.admin = userId;
    roomi.members = [userId, emisorId];
    const date = new Date();
    const stringDate = date.toString();
    roomi.createdAt = stringDate;
    roomi.updatedAt = stringDate;
    const deletei = {};
    deletei.id = props.location.state.noti.id;
    // console.log(acce);
    // console.log(contactid);
    qwer3({ variables: { contactid } });
    // asdf();
    qwer4({ variables: { roomi } });
    qwer5({ variables: { deletei } });
  };

  const decline = function (e) {
    // e.preventDefault();
    const deletei = {};
    deletei.id = props.location.state.noti.id;
    // console.log(deletei);

    // qwer5({ variables: { deletei } });
  };
  return (
    <div style={{ color: "white" }}>
      <h1>Friend request</h1>
      <p>
        {noti.emisor} has send you a friend request, click to accept or decline.
      </p>
      <Button
        style={{ margin: "20px" }}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.root}
        component={Link}
        to={{
          pathname: "/dashboard",
        }}
        onClick={accept}
      >
        Accept
      </Button>
      <Button
        style={{ margin: "20px" }}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.root}
        component={Link}
        to={{
          pathname: "/dashboard",
        }}
        onClick={decline}
      >
        Decline
      </Button>
    </div>
  );
}
