import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useRouteMatch } from "react-router-dom";
import { GET_CONTACTS } from "../graphql/queries";
import { GET_NOTIS } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { setcontacts } from "../features/contacts/contactsSlice";
import { setallnotis } from "../features/notifications/notiSlice";
import Button from "@material-ui/core/Button";
import { resetMessages } from "../features/messages/messageSlice";
import { resetSearch } from "../features/search/searchSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#61dafb",
  },
  button: {
    background: "linear-gradient(45deg, #61dafb 30%, #9cdef9 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: "40px",
    padding: "7px 22px",
    margin: "0px",
    display: "block",
    width: "10vw",
  },
  list: {
    display: "block",
  },
}));

export default function SimpleExpansionPanel() {
  let { url } = useRouteMatch();
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const contactsArray = state.contacts;
  // console.log("contactsArray", contactsArray);
  // const usersArray = state.allusers;
  // console.log(usersArray);

  let notis = state.notifications;

  const roomsa = state.rooms;
  let groupRooms = [];
  let namesArray = [];
  // console.log(roomsa);
  if (roomsa) {
    groupRooms = roomsa.filter((room) => room.type === "group");
    // console.log(groupRooms);
  }
  for (const roomName of groupRooms) {
    namesArray.push(roomName.title);
  }
  // console.log(namesArray);

  useQuery(GET_CONTACTS, {
    onCompleted(dataR) {
      dispatch(setcontacts(dataR.getcontacts));
    },
  });

  // console.log("getting contacts", dataR, loadingR);

  const { loading } = useQuery(GET_NOTIS, {
    onCompleted(data) {
      dispatch(setallnotis(data.getnotis));
      // console.log("get notis completed!!!!!!");
    },
  });
  // const creGroup = function () {

  // }
  // console.log("@@@getting notis", data, loading);
  // const getMess = function (e) {
  //   console.log(e.target);
  // };
  const convset = function () {
    // console.log("in convset function");

    dispatch(resetMessages());
  };

  const groupset = function () {
    // console.log("in roupset function");
    dispatch(resetMessages());
  };

  if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  const clean = function () {
    dispatch(resetSearch());
  };
  return (
    <div className={classes.root} onClick={clean}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Contacts</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {!contactsArray ? (
            <p>"Add a friend!!!"</p>
          ) : (
            <div>
              {contactsArray.map((user) => {
                return (
                  <p key={user.id}>
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to={{
                        pathname: `${url}/contact`,
                        state: { user },
                      }}
                    >
                      {user.nick}
                    </Link>
                  </p>
                );
              })}
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Notifications</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {!notis ? (
            <div>"No new notifications!!!"</div>
          ) : (
            <div>
              {notis.map((noti) => (
                <p key={noti.id}>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={{
                      pathname: `${url}/notification`,
                      state: { noti },
                    }}
                  >
                    {noti.emisor} friend request.
                  </Link>
                </p>
              ))}
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Conversations</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {!contactsArray ? (
            <p>"Add a friend!!!"</p>
          ) : (
            <div>
              {contactsArray.map((user) => (
                <p key={user.id}>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    // onClick={getMess}
                    to={{
                      pathname: "/dashboard/conversation",
                      state: { user },
                    }}
                    onClick={convset}
                  >
                    {user.nick}
                  </Link>
                </p>
              ))}
            </div>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Groups</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button
            // style={{ margin: "20px" }}
            component={Link}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            to={{
              pathname: `${url}/group`,
            }}
            onClick={groupset}
          >
            Create
          </Button>
          <br></br>
          {!groupRooms ? (
            <p>"Add a friend!!!"</p>
          ) : (
            <div className={classes.list}>
              {groupRooms.map((group) => (
                <p key={group.id}>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    // onClick={getMess}
                    to={{
                      pathname: "/dashboard/conversation",
                      state: { group },
                    }}
                  >
                    {group.title}
                  </Link>
                </p>
              ))}
            </div>
          )}
          <br></br>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
