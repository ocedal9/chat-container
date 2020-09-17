import React from "react";
// import { connect } from "react-redux";
// import { isAuth } from "features/auth/authSlice";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { blue } from "@material-ui/core/colors";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { isAuth } from "../features/auth/authSlice";
import { setuser } from "../features/user/userSlice";
import io from "socket.io-client";

export const socketn = io(
  "http://659df2aa-default-ingress-e8c7-583114532.us-east-1.elb.amazonaws.com/notisock",
  {
    path: "/notisock/socket.io",
    forceNew: true,
  }
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Guza "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
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
  root2: {
    background: "linear-gradient(45deg, #0288d1 30%, #b3e5fc 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: blue,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
}));

export function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { setIsAuth } = useContext(AuthContext);

  const [qwer2] = useMutation(ADD_USER, {
    onCompleted(data) {
      dispatch(setuser(data.newUser));
      dispatch(isAuth());
      socketn.emit("adduser", data.newUser);
    },
  });
  // console.log("in sign up", data, loading, error);

  const submit = function (e) {
    e.preventDefault();

    const newuser = {};
    newuser.nickname = e.target.elements.nickName.value;
    newuser.fullname = e.target.elements.fullName.value;
    newuser.email = e.target.elements.email.value;
    newuser.password = e.target.elements.password.value;
    // console.log(newuser);
    qwer2({ variables: { newuser } });
  };

  return (
    <ThemeProvider theme={darktheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="nickName"
                  variant="outlined"
                  required
                  fullWidth
                  id="nickName"
                  label="Nickname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.root2}
              // href="./dashboard"
            >
              {/* <Link href="./dashbooard" variant="body2"> */}
              Sign Up
              {/* </Link> */}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// export default connect(null, mapDispatch)(SignUp);
