import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LocalLibraryRoundedIcon from "@material-ui/icons/LocalLibraryRounded";
import { deepOrange } from "@material-ui/core/colors";
import {
  MenuItem,
  Menu,
  Avatar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
}));

function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const [menu, setmenu] = useState(null);
  const [Open, setOpen] = useState(false);
  const state = useSelector((state) => state);

  const handleMenu = (event) => {
    setmenu(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setmenu(null);
    setOpen(false);
  };
  const handleClick = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <LocalLibraryRoundedIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            to="/"
            component={Link}
            color="inherit"
          >
            BookPro
          </Typography>
          {state.user.USER_CURRENT_STATUS ? (
            <>
              <Button to="/modify" component={Link}>
                {" "}
                Update book{" "}
              </Button>
              <Button to="/add" component={Link}>
                {" "}
                Add book{" "}
              </Button>
              <Button to="/search" component={Link}>
                {" "}
                Search book{" "}
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar className={classes.orange}>
                  {state.user.USER_NAME.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Open}
                onClose={handleClose}
              >
                <MenuItem>{state.user.USER_NAME}</MenuItem>
                <MenuItem>{state.set.set.length}, books present</MenuItem>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button to="/auth" component={Link} color="inherit">
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default withRouter(Navbar);
