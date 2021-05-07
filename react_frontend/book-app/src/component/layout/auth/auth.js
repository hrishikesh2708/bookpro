import { withRouter, useHistory } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import toasting from "../../../toast/toast";
import { signIn, login } from "../../../api routes/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth_css } from "../../componentCSS";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { googleLogin } from "../../../api routes/api";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { user_details } from "../../../action/user_details";
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

function Auth() {
  const history = useHistory();
  const classes = auth_css();
  const dispatch = useDispatch();

  const google = (e) => {
    if (typeof e.tokenId !== "undefined") {
      const token = e.tokenId;
      googleLogin({ id: token })
        .then((res) => {
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          dispatch(user_details())
          history.push("/home");
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

  const onsubmit = (values, props) => {
    console.log(values);
    console.log(props);
    signIn(values)
      .then((res) => {
        console.log("register", res.data);
        login(values).then((res) => {
          console.log("login", res.data);
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          console.log("user logged in");
          dispatch(user_details())
          props.resetForm(true)
          history.push("/home");
        });
      })
      .catch((err) => {
        if (typeof err.response === "undefined") {
          toasting("warn", "Server is offline, try after sometime");
        } else {
          console.log(err.response.data);
          toasting("error", err.response.data.message);
        }
      });
  };
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Please enter valid Email").required("Required"),
    password: Yup.string()
      .min(6, "Password is too short")
      .max(20, "Password is too long")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("Required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
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
          <Formik
            initialValues={initialValues}
            onSubmit={onsubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  className={classes.typo}
                  name="name"
                  autoFocus
                  id="name"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  className={classes.typo}
                  id="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  className={classes.typo}
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                  type="password"
                />
                <Field
                  as={TextField}
                  className={classes.typo}
                  id="password2"
                  name="password2"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  fullWidth
                  helperText={<ErrorMessage name="password2" />}
                  type="password"
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
              </Form>
            )}
          </Formik>
        </Container>
      </Paper>
      <ToastContainer />
    </Container>
  );
}
export default withRouter(Auth);
