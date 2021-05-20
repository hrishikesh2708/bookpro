import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";
// import { useSelector} from "react-redux";
import { useSelector,useDispatch } from "react-redux";
import { nav } from "../componentCSS";
import { user_logout } from "../../action/user_details";
import LocalLibraryRoundedIcon from "@material-ui/icons/LocalLibraryRounded";
import {
  MenuItem,
  Menu,
  Avatar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
  Box,
} from "@material-ui/core";

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = nav();
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
    var DBOpenRequest = window.indexedDB.open("localforage", 2);
    DBOpenRequest.onsuccess = function(event) {
     var db = DBOpenRequest.result;
     deleteData(db);
    };
    localStorage.clear();
    dispatch(user_logout())
    history.push("/home");
  };
  function deleteData(db) {
        var transaction = db.transaction(["keyvaluepairs"], "readwrite");
    var objectStore = transaction.objectStore("keyvaluepairs");
    var objectStoreRequest = objectStore.delete("persist:user");  
    objectStoreRequest.onsuccess = function(event) {
      console.log("logout from persist")
    };
  };
  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar className={classes.root}>
          <Box className={classes.tool}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/home"
            >
              <LocalLibraryRoundedIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              to="/home"
              component={Link}
              color="inherit"
            >
              BookPro
            </Typography>
          </Box>
          {state.user.USER_CURRENT_STATUS ? (
            <>
              <Box>
                {/* <Button to="/modify" component={Link}>
                  {" "}
                  Update book{" "}
                </Button> */}
                {/* <Button to="/add" component={Link}>
                  {" "}
                  Add book{" "}
                </Button> */}
                <Button to="/myBooks" component={Link}>
                  {" "}
                  My Books{" "}
                </Button>
                {/* <Button to="/search" component={Link}>
                  {" "}
                  Search book{" "}
                </Button> */}
                {/* <Button to="/page" component={Link}>
                  {" "}
                  home{" "}
                </Button> */}
              </Box>
              <Box>
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
              </Box>
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
