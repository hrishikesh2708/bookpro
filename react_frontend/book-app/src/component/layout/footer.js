import React from "react";
import {
  Typography,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { foot } from "../componentCSS";
function Footer() {
  const classes = foot();
  return (
    <>
    
      <Paper elevation={6} className={classes.root}>
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <Link color="inherit" to="/">
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
