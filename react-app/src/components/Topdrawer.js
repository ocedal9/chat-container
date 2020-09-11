import React from "react";
// import { Link } from "react-router-dom";

// import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
// import { GET_NOTIS } from "../graphql/queries";
// import { setallusers } from "../features/user/allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useQuery } from "@apollo/react-hooks";
import { setSearch } from "../features/search/searchSlice";
import { LOGOUT } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { notAuth } from "../features/auth/authSlice";
import { resetUser } from "../features/user/userSlice";
import { resetContacts } from "../features/contacts/contactsSlice";
import { resetMessages } from "../features/messages/messageSlice";
import { resetNoti } from "../features/notifications/notiSlice";
import { resetRooms } from "../features/rooms/roomsSlice";
import { resetAllUsers } from "../features/user/allUsersSlice";

// import { socket } from "./MC_conversation";
// console.log(socket);
// import { useQuery } from "@apollo/react-hooks";
// import { Link, useRouteMatch } from "react-router-dom";
// let { url } = useRouteMatch();

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export function PrimarySearchAppBar(newSearch) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let notinum = state.notifications.length;

  const notiClick = function () {
    console.log("Noti Clicked");
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const [qwer5] = useMutation(LOGOUT, {
    onCompleted(data) {
      // socket.close();
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // console.log("out", data);
      dispatch(notAuth());
      dispatch(resetUser());
      dispatch(resetContacts());
      // dispatch(resetMessages());
      dispatch(resetNoti());
      dispatch(resetRooms());
      dispatch(resetAllUsers());
      dispatch(resetContacts());

      // document.cookie = "io=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // console.log(co);
    },
  });

  // useEffect(() => {
  //   // console.log("onmount");
  //   return () => {
  //     console.log("onmount");
  //     socket.close();
  //   };
  // }, [socket]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    console.log("in log out");
    qwer5();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout All</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={notiClick}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={notinum} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // const dispatch = useDispatch();

  // const { loading, error } = useQuery(GET_USERS, {
  //   onCompleted(data) {
  //     console.log("allusers", data, loading, error);

  //     dispatch(setallusers(data.getallusers));
  //   },

  // const notinum = state.notiNum;

  const noSearch = function (e) {
    e.target.value = "";
    // dispatch(setSearch(""));
  };
  const search = function (e) {
    const text = e.target.value;
    dispatch(setSearch(text));
  };

  // const outSearch = function (e) {
  // setInSearch(false);
  // e.target.value = "";
  // };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Generic Chat
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search new contact…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              // component={Link}

              // onClick={onSearch}
              onBlur={noSearch}
              onChange={search}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <span>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={notiClick}
              >
                <Badge badgeContent={notinum} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </span>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

// export default connect(null, mapDispatch)(PrimarySearchAppBar);
