import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportContactsSharpIcon from "@material-ui/icons/ImportContactsSharp";
import {
  TextField,
  Container,
  Box,
  Paper,
  Grid,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import toasting from "../../toast/toast";
import SearchIcon from "@material-ui/icons/Search";

const searchjsx = makeStyles((theme) => ({
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

function Search() {
  const [bookStatus, setbookStatus] = useState();
  const [data, setdata] = useState([]);
  const state = useSelector((state) => state);
  const classes = searchjsx();
  const handleChange = (e) => {
    var errormessage = "";
    const name = e.target.value.replace(/\s+/g, " ").trim();
    const regex = new RegExp(name, "i");
    console.log("handle change called", name);
    if (name.length > 2) {
      const postData = state.set.set.filter(({ title }) => title.match(regex));
      // console.log(" postdata ", postData);
      if (postData.length === 0) {
        setbookStatus(false);
        setdata(postData);
        errormessage = "No book found!";
        toasting("error", errormessage);
      } else {
        setbookStatus(true);
        setdata(postData);
      }
    }

    if (name.length <= 1) {
      setdata([]);
      setbookStatus(false);
    }
  };
  return (
    <Container className={classes.margin}>
      <Paper elevation={6} className={classes.paper}>
        <Box className={classes.box}>
          <Grid container alignItems="flex-end">
            <Grid item >
              <SearchIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="search"
                placeholder="Search Books...."
                variant="standard"
                type="string"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
        

        {bookStatus === true ? (
          <Box className={classes.box}>
          <Typography className={classes.sepration} >Search Result..</Typography>
            <List style={{maxHeight: '40vh', overflow: 'auto'}}>
              {data.map((row,index) => (
                <ListItem key={row._id || index.toString()}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImportContactsSharpIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.title}
                    secondary={row.author}
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
            </Box>
        ) : (
          <></>
        )}

      </Paper>
      <ToastContainer />
    </Container>
  );
}
export default Search;
