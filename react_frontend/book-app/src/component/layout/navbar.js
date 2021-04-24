import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import LocalLibraryRoundedIcon from "@material-ui/icons/LocalLibraryRounded";
import { deepOrange } from "@material-ui/core/colors";
import {MenuItem, Menu, Avatar, IconButton, Button, Typography, Toolbar, AppBar, } from "@material-ui/core";

import { connect } from "react-redux";
import { user_details } from "../../action/user_details";
import { set_store } from '../../action/book_action'

const useStyles = (theme) => ({
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
});

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      menu: null,
      open: false,
    };
  }
  handleMenu = (event) => {
    this.setState({
      menu: event.currentTarget,
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      menu: null,
      open: false,
    });
  };
  handleClick = () => {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  };
  render() {
    const { classes } = this.props;
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
            {this.props.user.USER_CURRENT_STATUS ? (
              <>
              <Button to="/modify" component={Link}> Update book </Button>
              <Button to="/add" component={Link}> Add book </Button>
              <Button to="/search" component={Link}> Search book </Button>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar className={classes.orange}>
                    {this.props.user.USER_NAME.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.menu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                  {this.props.user.USER_NAME}
                  </MenuItem>
                  <MenuItem>
                  {this.props.set.length}, books present
                  </MenuItem>
                  <MenuItem onClick={this.handleClick}>
                    Logout
                  </MenuItem>
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

        {/* <div>
          <Link to="/">BookPro</Link>
          {this.props.current_user_status === "logged in" ? (
            <>
              <p>{this.props.name}</p>
              <div>
                <Link to="/search"> Serach </Link>
              </div>
              <div>
                <Link to="/add"> Add Book </Link>
              </div>
              <div>
                <Link to="/modify"> Update book </Link>
              </div>
              <div>
                <button onClick={this.handleClick}>Logout</button>
              </div>
            </>
          ) : (
            <div>
              <Link to="/auth">Signup</Link>
            </div>
          )}
        </div> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  set: state.set
});
export default withRouter(connect(mapStateToProps, { user_details,set_store })(withStyles(useStyles)(Navbar)));
// export default withRouter(withStyles(useStyles)(Navbar));
