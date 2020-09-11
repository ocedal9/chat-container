import React from "react";
// import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
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
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { isAuth } from "../features/auth/authSlice";
import { setuser } from "../features/user/userSlice";
// console.log(isAuth());
// console.log(setuser("uuu"));

// import { AuthContext } from "../utils/Auth";
// import { isAuth } from "features/auth/authSlice";
// const mapDispatch = { isAuth };

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
  root: {
    background: "linear-gradient(45deg, #0288d1 30%, #b3e5fc 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: theme.spacing(2, 0, 1),
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
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
}));

export function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [inAuth, setInAuth] = useState("");
  // const authhh = useSelector((state) => state);

  const [qwer] = useMutation(LOGIN, {
    onCompleted(data) {
      dispatch(setuser(data.login));

      dispatch(isAuth());

      console.log(data.login);
    },
  });

  // console.log("in log in", data, loading, error);

  const submit = function (e) {
    e.preventDefault();
    const loginuser = {};
    loginuser.email = e.target.elements.email.value;
    loginuser.password = e.target.elements.password.value;
    // console.log(loginuser);
    qwer({ variables: { loginuser } });
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              style={{ color: "black" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.root}
              // href="./dashboard"
            >
              Sign In
            </Button>

            {/* </Linkr> */}
            <Grid container>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link style={{ color: "white" }} to="/signup">
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// export default connect(null, mapDispatch)(SignIn);
