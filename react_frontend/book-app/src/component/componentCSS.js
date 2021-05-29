import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
const drawerWidth = 240;
export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#424242",
    color: theme.palette.common.white,
    "&:active": {
      color: theme.palette.common.white,
    },
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.disabledBackground,
    // },
  },
}))(TableRow);

export const main = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    margin: theme.spacing(8, 0, 8, 8),
    padding: theme.spacing(0, 1, 1, 1),
    // marginLeft: -drawerWidth,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 0, 0, 6),
    ...theme.mixins.toolbar,
  },
}));

export const foot = makeStyles((theme) => ({
  root: {
    width: "95%",
    bottom: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: "#f5f5f5",
  },
}));

export const nav = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    textDecoration: "none",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  profile: {
    justifyContent: "center",
  },
  profileAvatar: {
    height: 100,
    width: 100,
  },
}));

export const home = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0 , 2),
  },
  head : {
    display:"flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: "70vh",
  },
  box: {
    margin: theme.spacing(2, 0, 2),
    width: "40%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(5),
    // width: `calc(100% - ${drawerWidth}px)`,
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(1),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  addEffect: {
    backgroundColor: "#c5cae9",
  },
  addCommit: {
    backgroundColor: "#7986cb",
  },
  addRollback: {
    backgroundColor: "#3f51b5",
  },
  modifyEffect: {
    backgroundColor: "#e1bee7",
  },
  modifyCommit: {
    backgroundColor: "#ce93d8",
  },
  modifyRollback: {
    backgroundColor: "#9c27b0",
  },
  deleteEffect: {
    backgroundColor: "#f44336",
  },
  deleteCommit: {
    backgroundColor: "#ef9a9a",
  },
  deleteRollback: {
    backgroundColor: "#ffcdd2",
  },
}));

export const homejsx = makeStyles((theme) => ({
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  box: {
    margin: theme.spacing(2, 2, 2),
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  sepration: {
    marginTop: theme.spacing(1),
    borderBottom: "Solid black 1px",
  },
  root: {
    width: "100%",
    mabackgroundColor: theme.palette.background.paper,
    xWidth: 360,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

export const addjsx = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "6%",
  },
  typo: {
    margin: theme.spacing(1.5, 0, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const modifyjsx = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    borderRadius: "6%",
  },
  box: {
    margin: theme.spacing(2, 0, 0),
    // width: "99%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  typo: {
    margin: theme.spacing(1, 0, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const login_css = makeStyles((theme) => ({
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

export const auth_css = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
    margin: theme.spacing(1, 0, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googlejsx: {
    margin: theme.spacing(0, 0, 1),
  },
}));

export const searchjsx = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(8),
  },
  box: {
    margin: theme.spacing(2, 0, 2),
    width: "99%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  sepration: {
    marginTop: theme.spacing(1),
    borderBottom: "Solid black 1px",
  },
  root: {
    width: "100%",
    mabackgroundColor: theme.palette.background.paper,
    xWidth: 360,
  },
}));
