import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import { add_book } from "../../action/book_action";
// import { add } from "../../api routes/api";
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
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const refresh = (e) => {
    setauthor("");
    setbookAdded(false);
    settitle("");
  };

  const onSubmit = (values,props) => {
    console.log(props)
    console.log(values)
    setauthor(values.author);
    settitle(values.title);
    const regex = new RegExp(values.title, "i");
    const postData = state.set.set.filter(({ title }) => title.match(regex));
    console.log(" postdata ", postData.length ,postData);
    if (postData.length === 0) {
      dispatch(add_book(values));
      setbookAdded(true);
    } else {
      toasting("error", "Book already Present!!");
    }
    // add(values)
    //   .then((value) => {
    //     console.log(value);
    //     setbookAdded(true);
    //   })
    //   .catch((err) => {
    //     if (typeof err.response === "undefined") {
    //       toasting("warn", "Server is offline, try after sometime");
    //     } else {
    //       toasting("error", err.response.data.message);
    //     }
    //   });
      props.resetForm(true)
  };
  const initialValues ={
    title:"",
    author:"",
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required")    
  })
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
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props)=>(
              <Form>
            <Field
            as={TextField}
            name="title"
              autoFocus
              required
              fullWidth
              className={classes.typo}
              id="title"
              label="Enter Book Name"
              variant="outlined"
              placeholder="Enter Book Name"
              helperText={<ErrorMessage name="title"/>}
            />
            <Field
            as={TextField}
            name="author"
              className={classes.typo}
              required
              fullWidth
              id="author"
              label="Author Enter Author Name"
              variant="outlined"
              placeholder="Author"
              helperText={<ErrorMessage name="author"/>}
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
          </Form>
            )}
          </Formik>
        </Box>
      </Paper>

      <ToastContainer />
    </Container>
  );
}
export default Add;
