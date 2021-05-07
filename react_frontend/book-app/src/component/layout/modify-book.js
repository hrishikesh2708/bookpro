import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toasting from "../../toast/toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImportContactsSharpIcon from "@material-ui/icons/ImportContactsSharp";
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
  Collapse,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Grid,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { modify_book } from "../../action/book_action";
// import { modify } from "../../api routes/api";
import { modifyjsx } from "../componentCSS";
import SearchIcon from "@material-ui/icons/Search";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Modify() {
  const dispatch = useDispatch();
  const classes = modifyjsx();
  const [open, setOpen] = React.useState(false);
  const [UpdateStatus, setUpdateStatus] = useState(false);
  const [newAuthor, setnewAuthor] = useState("");
  const [selectedBook_id, setselectedBook_id] = useState("");
  const [author, setauthor] = useState("");
  const [title, settitle] = useState("");
  const [bookStatus, setbookStatus] = useState(false);
  const [data, setdata] = useState([]);
  const state = useSelector((state) => state.set.set);

  const initialValues = {
    newauthor: "",
  };

  const validationSchema = Yup.object().shape({
    newauthor: Yup.string().required("Required"),
  });

  const onSubmit = (values, props) => {
    console.log(values, props);
    const bookdetails = {
      _id: selectedBook_id,
      title: title,
      author: values.newauthor,
    };
    setnewAuthor(values.newauthor);
    dispatch(modify_book(bookdetails));
    props.resetForm(true);
    setUpdateStatus(true);
    // modify(bookdetails)
    //   .then((res) => {
    //     console.log(res);
    //     console.log("book details updated");
    //     setUpdateStatus(true);
    //   })
    //   .catch((err) => {
    //     if (typeof err.response === "undefined") {
    //       toasting("warn", "Server is offline, try after sometime");
    //     } else {
    //       toasting("error", err.response.data.message);
    //     }
    //   });
  };

  const handleChange = (e) => {
    const name = e.target.value.replace(/\s+/g, " ").trim();
    const regex = new RegExp(name, "i");
    console.log("handle change called", name);
    if (name.length > 2) {
      const postData = state.filter(({ title }) => title.match(regex));
      // console.log(" postdata ", postData);
      if (postData.length > 0) {
        setbookStatus(true);
        setdata(postData);
        toasting("default", "book present!!");
      } else {
        setbookStatus(false);
        setdata(postData);
        toasting("warn", "book not present!!");
      }
    }
    setTimeout(() => {
      if (name.length === 0) {
        setdata([]);
        setbookStatus(false);
        toast.dismiss();
      }
    }, 1000);
  };

  const refresh = () => {
    setUpdateStatus(false);
    setauthor("");
    setnewAuthor("");
    settitle("");
    setOpen(false);
    setdata([]);
    setbookStatus(false);
    setselectedBook_id("");
  };

  const handleClick = (e) => {
    setOpen(!open);
    settitle(e.title);
    setselectedBook_id(e._id);
    setauthor(e.author);
    console.log(e);
  };

  return (
    <Container>
      <Dialog
        open={UpdateStatus}
        TransitionComponent={Transition}
        keepMounted
        onClose={refresh}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Book Updated successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Author of {title} book successfully changed from {author} to{" "}
            {newAuthor} !!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={refresh} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={5} className={classes.paper}>
        <Box mx={2} my={4} p={1}>
          <Typography variant="h5" className={classes.typo}>
            Search Book For Modification
          </Typography>
          <Box className={classes.box}>
            <Grid container alignItems="flex-end">
              <Grid item>
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
              <Typography variant="h6" className={classes.sepration}>
                Search Result..
              </Typography>
              <List style={{ maxHeight: "40vh", overflow: "auto" }}>
                {data.map((row, index) => (
                  <>
                    <ListItem
                      key={row._id || index.toString()}
                      button
                      onClick={(e) => {
                        handleClick(row);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ImportContactsSharpIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={row.title}
                        secondary={row.author}
                      ></ListItemText>
                      <EditIcon />
                    </ListItem>

                    {selectedBook_id === row._id ? (
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem
                            className={classes.nested}
                            key={row._id || index.toString()}
                          >
                            <Formik
                              initialValues={initialValues}
                              validationSchema={validationSchema}
                              onSubmit={onSubmit}
                            >
                              {(props) => (
                                <Form>
                                  <Field
                                    as={TextField}
                                    auto
                                    id="newAuthor"
                                    name="newauthor"
                                    label="Author Name"
                                    variant="outlined"
                                    placeholder="Enter name of new Author"
                                    helperText={
                                      <ErrorMessage name="newauthor" />
                                    }
                                  />
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                  >
                                    submit
                                  </Button>
                                </Form>
                              )}
                            </Formik>
                          </ListItem>
                        </List>
                      </Collapse>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </List>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
}
