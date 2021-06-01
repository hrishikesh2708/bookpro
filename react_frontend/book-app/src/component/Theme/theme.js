import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    type: "light",
    common: { black: "#000", white: "#fff" },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(111, 116, 221, 1)",
      main: "rgba(57, 73, 171, 1)",
      dark: "rgba(0, 34, 123, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffab40",
      contrastText: "#000",
    },
    error: {
      light: "rgba(229, 115, 115, 1)",
      main: "rgba(244, 67, 54, 1)",
      dark: "rgba(211, 47, 47, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",common: { black: "#000", white: "#fff" },
    primary: {
      light: "rgba(111, 116, 221, 1)",
      main: "rgba(57, 73, 171, 1)",
      dark: "rgba(0, 34, 123, 1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffab40",
      contrastText: "#000",
    },
    error: {
      light: "rgba(229, 115, 115, 1)",
      main: "rgba(244, 67, 54, 1)",
      dark: "rgba(211, 47, 47, 1)",
      contrastText: "#fff",
    },
  },
});
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
