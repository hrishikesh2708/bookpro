import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepPurple, amber } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: deepPurple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: amber[500],
      contrastText: deepPurple[900],
    },
    error:{
      light: "rgba(229,115,115,0.19)",
      main:"rgba(244,67,54,0.52)",
      dark:"rgba(211,47,47,0.59)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning:{
      light: "rgba(255,183,77,0.29)",
      main:"rgba(255,152,0,0.42)",
      dark:"rgba(255,152,0,0.57)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success:{
      light: "rgba(129,199,132,0.31)",
      main:"rgba(129,199,132,0.54)",
      dark:"rgba(56,142,60,0.54)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: amber[500],
      contrastText: deepPurple[900],
    },
    error:{
      light: "rgba(229,115,115,0.19)",
      main:"rgba(244,67,54,0.52)",
      dark:"rgba(211,47,47,0.59)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning:{
      light: "rgba(255,183,77,0.29)",
      main:"rgba(255,152,0,0.42)",
      dark:"rgba(255,152,0,0.57)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success:{
      light: "rgba(129,199,132,0.31)",
      main:"rgba(129,199,132,0.54)",
      dark:"rgba(56,142,60,0.54)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
});

themeDark.props = {
  MuiTooltip : {
    arrow : true,
  }
}

themeDark.overrides = {
  MuiTooltip: {
    tooltipPlacementRight : {
      backgroundColor: theme.palette.background.default,
      color : theme.palette.secondary.main,
      border: `2px solid  ${theme.palette.primary.main}`,
    },
    arrow: {
      color: theme.palette.primary.main,
    }
  }
}

theme.props = {
  MuiTooltip : {
    arrow : true,
  },
}

theme.overrides = {
  MuiTooltip: {
    tooltipPlacementRight : {
      backgroundColor: theme.palette.background.default,
      color : theme.palette.secondary.main,
      border: `2px solid  ${theme.palette.primary.main}`,
    },
    arrow: {
      color: theme.palette.primary.main,
    }
  },
  MuiTextField :{
    MuiOutlinedInput:{
      border: "3px solid rsred"
    }
  },
}


const Theme = (props) => {
  const { children, darkmode } = props;
  console.log(darkmode, theme);
  const defaultTheme = darkmode ? themeDark : theme;
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
export const withTheme = (Component) => {
  return (props) => {
    const [darkmode, setDarkmode] = React.useState(false);
    return (
      <Theme darkmode={darkmode}>
        <Component {...props} darkmode={darkmode} setDarkmode={setDarkmode} />
      </Theme>
    );
  };
};
