import { withRouter, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toasting from "../../../toast/toast";
import { signIn, login } from "../../../api routes/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth_css } from "../../componentCSS";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { googleLogin } from "../../../api routes/api";
import GoogleLogin from "react-google-login";
import {
  Typography,
  Link as Liink,
  Box,
  Button,
  TextField,
  Container,
  Avatar,
  Grid,
  Paper,
} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Liink color="inherit" href="/">
        Bookpro
      </Liink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Auth() {
  const history = useHistory();
  const classes = auth_css();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, seterrors] = useState({});

  const google = (e) => {
    if (typeof e.tokenId !== "undefined") {
      const token = e.tokenId;
      googleLogin({ id: token })
        .then((res) => {
          console.log("Google login access", res);
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          toasting("success", "Login successfull");
          setTimeout(() => {
            history.push("/");
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          toasting("error", err.response.data.message);
        });
    } else {
      toasting("warn", "No account selected!!");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(newUser);
    signIn(newUser)
      .then((res) => {
        console.log("register", res.data);
        login(newUser).then((res) => {
          console.log("login", res.data);
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          console.log("user logged in");
          toasting("success", "Login Successfull");
          setTimeout(() => {
            history.push("/");
            window.location.reload();
          }, 1000);
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toasting("error", error.response.data.email);
        } else {
          toasting("error", "Input data not valid");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Container className={classes.content}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form noValidate className={classes.form} onSubmit={onSubmit}>
            <TextField
              className={classes.typo}
              autoFocus
              id="name"
              label="Name"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => {
                setName(e.target.value.replace(/\s+/g, " ").trim());
              }}
              value={name}
              error={errors.name}
            />
            <TextField
              className={classes.typo}
              id="email"
              label="Email Address"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s+/g, " ").trim());
              }}
              value={email}
              error={errors.email}
            />
            <TextField
              className={classes.typo}
              id="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value.trim());
              }}
              type="password"
              value={password}
              error={errors.password}
            />
            <TextField
              className={classes.typo}
              id="password2"
              label="Confirm Password"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => {
                setPassword2(e.target.value.trim());
              }}
              type="password"
              value={password2}
              error={errors.password2}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submit}
              fullWidth
            >
              Sign up
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Continue with Google"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  className={classes.googlejsx}
                  color="default"
                  variant="contained"
                  fullWidth
                >
                  Sign Up with Google
                </Button>
              )}
              onSuccess={google}
              onFailure={google}
              cookiePolicy={"single_host_origin"}
            />
            <Grid container>
              <Grid item xs>
                <Liink component={Link} to="/" variant="body2">
                  Back to home
                </Liink>
              </Grid>
              <Grid item>
                <Liink component={Link} to="/login" variant="body2">
                  {"Have an account? Sign In"}
                </Liink>
              </Grid>
            </Grid>
            <Box className={classes.submit}>
              <Copyright />
            </Box>
          </form>
        </Container>
      </Paper>
      <ToastContainer />
    </Container>
  );
}
export default withRouter(Auth);
