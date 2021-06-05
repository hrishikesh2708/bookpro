import React from "react";
import {
  Typography,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const foot = makeStyles((theme) => ({
  root: {
    width: "95%",
    bottom: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
}));
function Footer() {
  const classes = foot();
  return (
    <>
    
      <Paper elevation={6} className={classes.root}>
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <Link color="primary" to="/">
            Bookpro
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Paper>
    </>
  );
}
export default Footer;
