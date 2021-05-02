import { makeStyles } from '@material-ui/core/styles';

export const login_css = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: "6%"
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: "10%"
    },
    avatar: {
      margin: theme.spacing(4, 0 ,1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: "6%"
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: "10%"
    },
    avatar: {
      margin: theme.spacing(4, 0 ,1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
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