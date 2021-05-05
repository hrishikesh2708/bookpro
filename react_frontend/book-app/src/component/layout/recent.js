import React from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Box,
} from "@material-ui/core";
import ImportContactsSharpIcon from "@material-ui/icons/ImportContactsSharp";
import { recent } from "../componentCSS";
export default function Recent() {
  const classes = recent();
  const state = useSelector((state) => state);
  console.log("recent", state);
  return (
    <Paper elevation={5} className={classes.paper}>
      <Box className={classes.box}>
        <Typography className={classes.sepration}>Recently Added</Typography>
        {state.set.recently_added.length === 0 ? (
          <Typography>No book found</Typography>
        ) : (
          <List style={{maxHeight: '40vh', overflow: 'auto'}}>
            {state.set.recently_added.map((row,index) => (
              <ListItem  key={row._id || index.toString()}>
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
        )}
      </Box>
    </Paper>
  );
}
