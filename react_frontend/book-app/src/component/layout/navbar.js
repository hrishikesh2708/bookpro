import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { nav } from "../componentCSS";
import { user_logout } from "../../action/user_details";
import {
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Brightness6Icon from '@material-ui/icons/Brightness6';
import MenuBookIcon from '@material-ui/icons/MenuBook';

function Navbar( props ) {
  const {darkmode,setDarkmode} = props
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = nav();
  const [open, setopen] = React.useState(false);
  const state = useSelector((state) => state);

  const handleClick = () => {
    var DBOpenRequest = window.indexedDB.open("localforage", 2);
    DBOpenRequest.onsuccess = function (event) {
      var db = DBOpenRequest.result;
      deleteData(db);
    };
    localStorage.clear();
    dispatch(user_logout());
    history.push("/home");
  };
  function deleteData(db) {
    var transaction = db.transaction(["keyvaluepairs"], "readwrite");
    var objectStore = transaction.objectStore("keyvaluepairs");
    var objectStoreRequest = objectStore.delete("persist:user");
    objectStoreRequest.onsuccess = function (event) {
      console.log("logout from persist");
    };
  }

  const handleDrawerOpen = () => {
    setopen(true);
  };

  const handleDrawerClose = () => {
    setopen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            noWrap
            to="/home"
            component={Link}
            color="inherit"
          >
            BookPro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton  onClick={handleDrawerClose}>
            <CloseIcon classes={{root:classes.icon}}/>
          </IconButton>
        </div>
        <Divider  classes={{root:classes.divider}}/>

        <Tooltip title="Profile" placement="right">
          <List>
            <ListItem className={classes.profile}>
              <Avatar
                alt={state.user.USER_NAME}
                src={state.user.USER_PROFILE}
                className={clsx({
                  [classes.profileAvatar]: open,
                })}
              />
            </ListItem>
            <ListItem
              className={clsx({
                [classes.profile]: open,
                [classes.hide]: !open,
              })}
            >
              <Typography variant="h6" classes={{root:classes.listItemTextPrimary}}>{state.user.USER_NAME}</Typography>
            </ListItem>
            <ListItem
              className={clsx({
                [classes.profile]: open,
                [classes.hide]: !open,
              })}
            >
              <Typography classes={{root:classes.listItemTextSecondary}}>
                {state.user.USER_EMAIL}
              </Typography>
            </ListItem>
          </List>
        </Tooltip>

        <Divider classes={{root:classes.divider}}/>
        <List >
          <Tooltip title="My Books" placement="right">
            <ListItem button to="/myBooks" component={Link}>
              <ListItemIcon>
                <MenuBookIcon classes={{root:classes.icon}}/>
              </ListItemIcon>

              <ListItemText
              classes={{primary:classes.listItemTextPrimary,secondary:classes.listItemTextSecondary}}
                primary="My Books"
                secondary={state.set.privateBooks.length}
              />
            </ListItem>
          </Tooltip>
          <Tooltip title="All Books" placement="right">
            <ListItem button to="/home" component={Link}>
              <ListItemIcon>
                <LibraryBooksIcon classes={{root:classes.icon}} />
              </ListItemIcon>

              <ListItemText
               classes={{primary:classes.listItemTextPrimary,secondary:classes.listItemTextSecondary}}
                primary="All Books"
                secondary={state.set.set.length}
              />
            </ListItem>
          </Tooltip>

          <Tooltip
            title="Theme"
            placement="right"
          >
            <ListItem button 
            onClick={() => setDarkmode(!darkmode)}
            >
              <ListItemIcon>
                <Brightness6Icon classes={{root:classes.icon}}/>
              </ListItemIcon>
              <ListItemText
               classes={{primary:classes.listItemTextPrimary,secondary:classes.listItemTextSecondary}}
                primary="Dark mode" />
            </ListItem>
          </Tooltip>

          <Tooltip
            title="Logout"
            placement="right"
            className={clsx({
              [classes.hide]: !state.user.USER_CURRENT_STATUS,
            })}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <ExitToAppIcon classes={{root:classes.icon}}/>
              </ListItemIcon>
              <ListItemText 
               classes={{primary:classes.listItemTextPrimary,secondary:classes.listItemTextSecondary}}
              primary="Logout" />
            </ListItem>
          </Tooltip>

          <Tooltip
            title="Signup"
            placement="right"
            className={clsx({ [classes.hide]: state.user.USER_CURRENT_STATUS })}
          >
            <ListItem button to="/auth" component={Link}>
              <ListItemIcon>
                <PersonAddIcon classes={{root:classes.icon}}/>
              </ListItemIcon>

              <ListItemText
               classes={{primary:classes.listItemTextPrimary,secondary:classes.listItemTextSecondary}}
               primary="Signup" />
            </ListItem>
          </Tooltip>
        </List>
        <Divider classes={{root:classes.divider}}/>
      </Drawer>
    </div>
  );
}
export default withRouter(Navbar);
