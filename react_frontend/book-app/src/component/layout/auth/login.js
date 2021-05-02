import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter, useHistory } from "react-router-dom";
import toasting from "../../../toast/toast";
import { googleLogin, login } from "../../../api routes/api";
import { login_css } from "../../componentCSS";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Typography,
  Link as Liink,
  Box,
  Button,
  TextField,
  Container,
  Avatar,
  Grid,
  Paper
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
function Login() {
  const history = useHistory();
  const classes = login_css();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
          }, 1000);
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
    const userData = {
      email: email,
      password: password,
    };
    console.log(userData);
    login(userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        toasting("success", "Login successfull");
        console.log("Login successfull");
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data.email);
        toasting("error", err.response.data.eamil);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Paper className={classes.paper}>
      <Container className={classes.content}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate className={classes.form} onSubmit={onSubmit}>
          <TextField
           className={classes.typo}
            id="email"
            label="Email Address"
            type="email"
            variant="outlined"
            required
            fullWidth
            autoFocus
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value.replace(/\s+/g, " ").trim());
            }}
            value={email}
            error={errors.email}
          />
          <TextField
           className={classes.typo}
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value.replace(/\s+/g, " ").trim());
            }}
            value={password}
            error={errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
            type="submit"
          >
            Sign in
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
                Sign in with Google
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
              <Liink component={Link} to="/auth" variant="body2">
                {"Don't have an account? Sign Up"}
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
export default withRouter(Login);
