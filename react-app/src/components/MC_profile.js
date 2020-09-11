import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { FRIEND_PETITION } from "../graphql/mutations";
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

export default function MCprofile(props) {
  const classes = useStyles();
  // console.log(props.location);

  // const state = useSelector((state) => state);
  // const emisor = state.user.profile.nickname;
  // console.log(props.location);
  // if (props.location.profile) {
  var profparams = props.location.profile.user;
  // contact.email = props.location.profile.user.email;
  var emisorNick = props.location.cliuser.clius.nickname;
  var emisorId = props.location.cliuser.clius.id;
  // console.log(props.location.cliuser.clius, profparams);
  const [qwer3] = useMutation(FRIEND_PETITION, {
    onCompleted(data) {
      // console.log("mutation completed", data);
      // socketn.emit("friendpet", data.friendreq);
    },
  });
  // console.log("Send Friendreq", data, loading, error);
  const sendrqst = function (e) {
    // e.preventDefault();
    const notin = {};

    notin.target = profparams.id;
    notin.notitype = "Friend Request";
    notin.status = "sended";
    notin.emisor = emisorNick;
    notin.emisorId = emisorId;

    // console.log(notin);

    qwer3({ variables: { notin } });
  };

  return (
    <div style={{ color: "white" }}>
      <h1>Profile</h1>
      <p>Nickname: {profparams.nickname}</p>
      <p>Full name: {profparams.fullname}</p>
      <p>Email: {profparams.email}</p>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={sendrqst}
        to={{
          pathname: "/dashboard",
        }}
      >
        Send friend Request
      </Button>
    </div>
  );
}
