import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { user_details } from "../../../action/user_details";
import { useHistory } from "react-router-dom";
import toasting from "../../../toast/toast";
import { googleLogin, login } from "../../../api routes/api";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
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

const login_css = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "6%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10%",
  },
  avatar: {
    margin: theme.spacing(4, 0, 1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  typo: {
    margin: theme.spacing(1.5, 0, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googlejsx: {
    margin: theme.spacing(0, 0, 2),
  },
}));

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
export default function Login() {
  const history = useHistory();
  const classes = login_css();
  const dispatch = useDispatch()
  const google = (e) => {
    console.log("g login called!!")
    if (typeof e.tokenId !== "undefined") {
      console.log("g login called!!")
      const token = e.tokenId;
      googleLogin({ id: token })
        .then((res) => {
          const { token } = res.data;
          localStorage.clear();
          localStorage.setItem("jwtToken", token);
          dispatch(user_details())
          history.push("/");
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
    // console.log(values);
    // console.log(props);
    login(values)
      .then((res) => {
        const { token } = res.data;
        localStorage.clear();
        localStorage.setItem("jwtToken", token);
        props.resetForm(true)
        dispatch(user_details())
        history.push("/");
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
                  onSuccess={(e) => {google(e)}}
                  onFailure={(e) => {google(e)}}
                  cookiePolicy={"single_host_origin"}
                />
                <Grid container>
                  <Grid item xs>
                    <Liink component={Link} to="/" variant="body2">
                      Back to home
                    </Liink>
                  </Grid>
                  <Grid item>
                    <Liink component={Link} to="/signup" variant="body2">
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
