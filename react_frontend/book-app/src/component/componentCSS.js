import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

export const foot = makeStyles((theme)=>({
  root: {
    width:"100%",
    bottom: 0,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor:"#f5f5f5"
  },
}));

const drawerWidth = 240;
export const nav = makeStyles((theme) => ({
  root: {
    display:"flex",
    // flexDirection: "row",
    // alignItems: "center",
  },
  tool:{
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  title: {   
    flexGrow: 1, 
    padding: theme.spacing(1),
    textDecoration: "none",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
    margin: theme.spacing(2, 0,0),
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
    margin: theme.spacing(2, 0,2),
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


export const homejsx = makeStyles((theme) => ({
  load: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  box: {
    margin: theme.spacing(2, 2,2),
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
}));


export const recent = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(2, 0,2),
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  sepration: {
    marginTop: theme.spacing(1),
    borderBottom: "Solid black 1px",
  },
}));



export const main = makeStyles((theme)=>({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
}));