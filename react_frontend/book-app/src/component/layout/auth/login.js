import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter, useHistory } from "react-router-dom";
import toasting from "../../../toast/toast";
import { googleLogin, login } from "../../../api routes/api";
import { login_css } from "../../componentCSS";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
function Login() {
  const history = useHistory();
  const classes = login_css();
  const google = (e) => {
    if (typeof e.tokenId !== "undefined") {
      const token = e.tokenId;
      googleLogin({ id: token })
        .then((res) => {
          console.log("Google login access", res);
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          if (typeof err.response === "undefined") {
            toasting("warn", "Server is offline, try after sometime");
          } else {
            toasting("error", err.response.data.message);
          }
        });
    } else {
      toasting("warn", "No account selected!!");
    }
  };

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
    login(values)
      .then((res) => {
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        props.resetForm(true)
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        if (typeof err.response === "undefined") {
          toasting("warn", "Server is offline, try after sometime");
        } else {
          toasting("error", err.response.data.message);
        }
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Container className={classes.content}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  className={classes.typo}
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  autoComplete="email"
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  className={classes.typo}
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
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
              </Form>
            )}
          </Formik>
        </Container>
      </Paper>

      <ToastContainer />
    </Container>
  );
}
export default withRouter(Login);
