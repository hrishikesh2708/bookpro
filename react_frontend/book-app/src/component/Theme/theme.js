import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
const theme = createMuiTheme({
    palette: {
    type:"light",
    },
  });
  const themeDark = createMuiTheme({
    palette: {
    type:"dark",
    },
  });
const Theme = (props) =>{
    const { children, darkmode } = props
    console.log(darkmode,theme)
    const defaultTheme = darkmode ? themeDark : theme
    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}
export const withTheme = (Component) => {
    return (props) => {
        const [darkmode,setDarkmode] = React.useState(false)
        return (
            <Theme darkmode={darkmode}>
                <Component {...props} darkmode = {darkmode} setDarkmode = {setDarkmode}/>
            </Theme>
        )
    }
}

