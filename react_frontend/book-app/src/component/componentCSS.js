import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, TextField} from "@material-ui/core";
const drawerWidth = 240;
export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
  },
  body: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  root: {
    borderColor: theme.palette.secondary.light,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.disabledBackground,
    // },
    color: theme.palette.text.primary,
    border : `1px solid ${theme.palette.text.primary}`
  },
}))(TableRow);

export const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      color: theme.palette.secondary.main,
    },
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);
export const main = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
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
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const nav = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.primary.contrastText,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
  },
  drawerOpen: {
    width: drawerWidth,
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
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
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
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
  divider: {
    background: theme.palette.divider,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  listItemTextPrimary: {
    color: theme.palette.text.primary,
  },
  listItemTextSecondary: {
    color: theme.palette.text.secondary,
  },
}));

export const home = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0, 2),
  },
  divider: {
    background: theme.palette.divider,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  input: {
    color: theme.palette.text.primary,
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  selectDropdown: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  multilineColor :{
    color : theme.palette.secondary.main,
  },
  menuItem: {
    background: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: "#3b3f58",
    },
  },
  table: {
    minWidth: 750,
  },
  csshover: {
    color: "green"
  },
  container: {
    maxHeight: "70vh",
    border : `1px solid ${theme.palette.secondary.light}`
  },
  box: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    // width: `calc(100% - ${drawerWidth}px)`,
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.primary,
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
  delete: {
    color: theme.palette.error.dark,
  },
  edit: {
    color: theme.palette.primary.main,
  },
  pagination: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  tablepage: {
    align: "right",
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  button: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
  },
  hover: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    }
  },
  addEffect: {
    backgroundColor: theme.palette.success.light,
  },
  addCommit: {
    backgroundColor: theme.palette.success.main,
  },
  // addRollback: {
  //   backgroundColor: theme.palette.success.dark,
  // },
  modifyEffect: {
    backgroundColor: theme.palette.warning.light,
  },
  modifyCommit: {
    backgroundColor: theme.palette.warning.main,
  },
  modifyRollback: {
    backgroundColor: theme.palette.warning.dark,
  },
  deleteEffect: {
    backgroundColor: theme.palette.error.light,
  },
  // deleteCommit: {
  //   backgroundColor: theme.palette.error.main,
  // },
  deleteRollback: {
    backgroundColor: theme.palette.error.main,
  },
}));

export const mybooks = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0, 2),
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: "75vh",
    border : `1px solid ${theme.palette.secondary.light}`
  },
  paper: {
    margin: theme.spacing(2, 2, 2, 4),
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0, 0, 2),
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  divider: {
    background: theme.palette.divider,
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
    borderRadius: "20px",
    // backgroundColor : theme.palette.background.paper,
    // color: theme.palette.text.primary,
    
  },
  title:{
    // color: theme.palette.text.primary,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10%",
    color: theme.palette.text.primary,
  },
  avatar: {
    margin: theme.spacing(4, 0, 1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  typo: {
    color: theme.palette.text.primary,
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
