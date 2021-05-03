import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Box,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { add_book, book_details } from "../../action/book_action";
import { add } from "../../api routes/api";
import toasting from "../../toast/toast";
import { addjsx } from "../componentCSS";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Add() {
  const classes = addjsx();
  const [bookAdded, setbookAdded] = useState(false);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [errors, seterrors] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const refresh = (e) => {
    setauthor("");
    setbookAdded(false);
    settitle("");
    seterrors({});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      author: author,
      title: title,
    };
    console.log(bookData);
    const regex = new RegExp(title, "i");
    const postData = state.set.set.filter(({ title }) => title.match(regex));
    // console.log(" postdata ", postData);
    if (postData.length === 0) {
      dispatch(add_book(bookData));
    } else {
      toasting("error", "Book already exist!!");
    }
    add(bookData)
      .then((value) => {
        console.log(value);
        setbookAdded(true);
      })
      .catch((e) => {
        console.log("err", e.response.status);
        if (e.response.status === 400) {
          toasting("error", "Book already exist!!");
        } else if (e.response.status === 422) {
          toasting("error", "Book does not exist!!");
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Dialog
        open={bookAdded}
        TransitionComponent={Transition}
        keepMounted
        onClose={refresh}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Book Added successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {title} book with author {author} added successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={refresh} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={5} className={classes.paper}>
        <Box mx={4} my={3} p={1}>
          <Typography variant="h5">Enter Book Details</Typography>
          <form noValidate onSubmit={onSubmit}>
            <TextField
              autoFocus
              required
              fullWidth
              className={classes.typo}
              id="title"
              label="Enter Book Name"
              variant="outlined"
              placeholder="Enter Book Name"
              onChange={(e) =>
                settitle(e.target.value.replace(/\s+/g, " ").trim())
              }
              value={title}
              error={errors.title}
            />
            <TextField
              className={classes.typo}
              required
              fullWidth
              id="author"
              label="Author Enter Author Name"
              variant="outlined"
              placeholder="Author"
              onChange={(e) =>
                setauthor(e.target.value.replace(/\s+/g, " ").trim())
              }
              value={author}
              error={errors.author}
            />
            <Button
              variant="contained"
              className={classes.submit}
              fullWidth
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Paper>

      <ToastContainer />
    </Container>
  );
}
export default Add;
