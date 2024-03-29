//hooks and action
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  delete_book,
  modify_book,
  add_book,
  add_book_commit,
  modify_book_commit,
  delete_book_commit,
} from "../../../action/book_action";
import toasting from "../../../toast/toast";
import { Formik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";
import { EventSourcePolyfill } from "event-source-polyfill";
import { TablePaginationActions } from "./pagination";
import { EnhancedTableHead, stableSort, getComparator } from "./sorting";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// material ui icon
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//material ui components
import {
  Paper,
  Typography,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  Slide,
  LinearProgress,
  TableBody,
  Divider,
  Fab,
  TextField,
  TableContainer,
  IconButton,
  TableCell,
  TableRow,
  TablePagination,
} from "@material-ui/core";


//-----------------Main Component-------------------------//

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.light,
  },
  body: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  root: {
    borderColor: theme.palette.secondary.light,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    border : `1px solid ${theme.palette.text.primary}`
  },
}))(TableRow);

const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      color: theme.palette.secondary.main,
    },
    '& label.Mui-focused': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);

const home = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0, 2),
  },
  divider: {
    background: theme.palette.divider,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  input: {
    color: theme.palette.text.primary,
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  selectDropdown: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  multilineColor :{
    color : theme.palette.secondary.main,
  },
  menuItem: {
    background: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: "#3b3f58",
    },
  },
  table: {
    minWidth: 750,
  },
  csshover: {
    color: "green"
  },
  container: {
    maxHeight: "70vh",
    border : `1px solid ${theme.palette.secondary.light}`
  },
  box: {
    margin: theme.spacing(2, 0, 2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.primary,
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(1),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  delete: {
    color: theme.palette.error.dark,
  },
  edit: {
    color: theme.palette.primary.main,
  },
  pagination: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  tablepage: {
    align: "right",
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  button: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
  },
  hover: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    }
  },
  addEffect: {
    backgroundColor: theme.palette.success.light,
  },
  addCommit: {
    backgroundColor: theme.palette.success.main,
  },
  modifyEffect: {
    backgroundColor: theme.palette.warning.light,
  },
  modifyCommit: {
    backgroundColor: theme.palette.warning.main,
  },
  modifyRollback: {
    backgroundColor: theme.palette.warning.dark,
  },
  deleteEffect: {
    backgroundColor: theme.palette.error.light,
  },
  deleteRollback: {
    backgroundColor: theme.palette.error.main,
  },
}));


export default function NewHome() {
  const classes = home();
  const state = useSelector((state) => state.set.set);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState(state);
  const [bookStatus, setbookStatus] = useState();
  const [addBookCall, setaddBookCall] = useState(false);
  const [modifyBookcall, setmodifyBookcall] = useState(false);
  const [deleteConfirm, setdeleteConfirm] = useState(false);
  const [selectedBookDetails, setselectedBookDetails] = useState();
  const [deleteBook, setdeleteBook] = useState();
  const [serResult, setserResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date_added");
  const dense = false;

  const customModify = store.set.modifyEffectCall
    ? classes.modifyEffect
    : store.set.modifyCommitCall
    ? classes.modifyCommit
    : classes.modifyRollback;
  const customAdd = store.set.addEffectCall
    ? classes.addEffect
    : store.set.addCommitCall
    ? classes.addCommit
    : null;
  const customDel = store.set.deleteEffectCall
    ? classes.deleteEffect
    : store.set.deleteCommitCall
    ? null
    : classes.deleteRollback;
  const customColor = store.set.add
    ? customAdd
    : store.set.modify
    ? customModify
    : store.set.delete
    ? customDel
    : null;
  const customId =
    customColor === customAdd
      ? store.set.bookAdded.title
      : customColor === customModify
      ? store.set.bookModified.title
      : customColor === customDel
      ? store.set.bookTobeDeleted.title
      : null;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSearch = (e) => {
    var errormessage = "";
    const name = e.target.value.replace(/\s+/g, " ").trim();
    const regex = new RegExp(name, "i");
    console.log("handle change called", name);
    if (name.length > 2) {
      const postData = state.filter(({ title }) => title.match(regex));
      // console.log(" postdata ", postData);
      if (postData.length === 0) {
        setbookStatus(false);
        setData(state);
        errormessage = "No book found!";
        toasting("error", errormessage);
      } else {
        setbookStatus(true);
        setserResult(postData);
      }
    }
    if (name.length <= 1) {
      setbookStatus(false);
      setData(state);
    }
  };
  const deleteAction = (contents) => {
    setdeleteBook(contents);
  };
  const onDelete = () => {
    console.log(deleteBook);
    setdeleteConfirm(false);
    dispatch(
      delete_book({
        id: deleteBook._id,
        book: {
          _id: deleteBook._id,
          title: deleteBook.title,
          author: deleteBook.author,
          date_added: deleteBook.date_added,
          user_id: deleteBook.user_id,
        },
        token: localStorage.getItem("jwtToken"),
      })
    );
  };
  useEffect(() => {
    // console.log("props" , props.event)
    let eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_LOCALHOST}/api/stream`,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    );
    eventSource.onopen = (e) => {
      // console.log("client name ", e);
    };
    eventSource.onmessage = (e) => {
      let res = JSON.parse(e.data);
      // console.log("data sent by server  ", Object.keys(res)[0]);
      switch (Object.keys(res)[0]) {
        case "book_added":
          console.log(res.book_added, "book_added");
          dispatch(add_book_commit(res.book_added));
          toasting("success", " New book added by different user!!");
          break;
        case "book_edited":
          console.log(res.book_edited, "book_edited");
          dispatch(modify_book_commit(res.book_edited));
          toasting("success", "Book was recently updated by different user");
          break;
        case "book_deleted":
          console.log(res.book_deleted, "book_deleted");
          dispatch(delete_book_commit(res.book_deleted));
          toasting("success", "Book was deleted by different user");
          break;
        case "private_book":
          console.log(res.private_book, "private_book");
          break;
        default:
          break;
      }
    };
    eventSource.onerror = (e) => {
      console.log("no response from server");
    };
    return() => {
      eventSource.close()
    }
  }, []);
  useEffect(() => {
    // console.log("useeffect is called");
    setData(state);
    if (bookStatus) {
      setData(serResult);
      // console.log(serResult, "search result");
    }
  }, [store, serResult]);

  return (
    <div className={classes.root}>
      {store.set.loading_status ? (
        <div className={classes.load}>
          <LinearProgress color="secondary"/>
        </div>
      ) : (
        <></>
      )}
      <div className={classes.head}>
        <Typography variant="h4" noWrap className={classes.title}>
          Books List
        </Typography>
        <Fab
          size="small"
          disabled={store.user.USER_CURRENT_STATUS === false}
          edge="end"
          onClick={() => setaddBookCall(true)}
          variant="extended"
          classes={{ root: classes.button }}
        >
          <AddIcon />
          Add Book
        </Fab>
      </div>
      <Divider classes={{ root: classes.divider }} />

      <Paper elevation={5} className={classes.paper}>
        <div className={classes.box}>
          <CssTextField
             InputLabelProps={{
              className: classes.multilineColor,
            }}
            label = "Search"
            id="search"
            placeholder="Search Books...."
            variant="outlined"
            type="string"
            fullWidth
            onChange={handleSearch}
          />
        </div>
        <TableContainer className={classes.container}>
          <Table stickyHeader={true} className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ _id, title, author, date_added, user_id }) => (
                  <StyledTableRow
                    hover
                    key={_id}
                    className={title === customId ? customColor : null}
                  >
                    {/* <StyledTableCell>{_id}</StyledTableCell> */}
                    <StyledTableCell>{title}</StyledTableCell>
                    <StyledTableCell>{author}</StyledTableCell>
                    <StyledTableCell>
                      {moment(date_added).format("MMMM Do YYYY, h:mm:ss a")}
                    </StyledTableCell>
                    <StyledTableCell
                      className={customElements}
                      component="th"
                      scope="row"
                    >
                      <IconButton
                        classes={{ root: classes.delete }}
                        onClick={() => (
                          setdeleteConfirm(true),
                          deleteAction({
                            _id,
                            title,
                            author,
                            date_added,
                            user_id,
                          })
                        )}
                        size="small"
                        disabled={store.user.USER_ID !== user_id}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        classes={{ root: classes.edit }}
                        onClick={() => (
                          setmodifyBookcall(true),
                          setselectedBookDetails({
                            _id,
                            title,
                            author,
                            date_added,
                            user_id,
                          })
                        )}
                        size="small"
                        disabled={store.user.USER_CURRENT_STATUS !== true}
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{ height: (dense ? 33 : 53) * emptyRows }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          classes={{ menuItem: classes.menuItem , root:classes.pagination}}
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            MenuProps: { classes: { paper: classes.selectDropdown } },
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      <ToastContainer />

      <Dialog
        open={deleteConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setdeleteConfirm(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Typography>Are You Sure ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button type="button" className="outline" onClick={() => onDelete()}>
            Yes
          </Button>
          <Button
            type="button"
            className="outline"
            onClick={() => setdeleteConfirm(false)}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modifyBookcall}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setmodifyBookcall(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Update Author"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              newauthor: "",
            }}
            validationSchema={Yup.object().shape({
              newauthor: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              console.log(values, selectedBookDetails);
              dispatch(
                modify_book({
                  newData: {
                    _id: selectedBookDetails._id,
                    author: values.newauthor,
                    title: selectedBookDetails.title,
                    date_added: selectedBookDetails.date_added,
                  },
                  oldData: selectedBookDetails,
                  token: localStorage.getItem("jwtToken"),
                })
              );
              toasting("success", "Book Modified")
              setmodifyBookcall(false);
              resetForm(true);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={errors.newauthor && touched.newauthor}
                    label="Author Name"
                    name="newauthor"
                    fullWidth
                    className={classes.textField}
                    value={values.newauthor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.newauthor && touched.newauthor && errors.newauthor
                    }
                    margin="normal"
                  />
                  <DialogActions>
                    <Button
                      type="button"
                      className="outline"
                      variant="contained"
                      color="primary"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog
        open={addBookCall}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setaddBookCall(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Add Book"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: "",
              author: "",
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required"),
              author: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              console.log(values);
              const regex = new RegExp(values.title, "i");
              const postData = state.filter(({ title }) => title.match(regex));
              console.log(" postdata ", postData.length, postData);
              if (postData.length === 0) {
                dispatch(
                  add_book({
                    token: localStorage.getItem("jwtToken"),
                    data: {
                      title: values.title,
                      author: values.author,
                      id: store.user.USER_ID || "",
                    },
                  })
                );
                toasting("success", "Book Added!!");
              } else {
                toasting("error", "Book already Present!!");
              }
              setaddBookCall(false);
              resetForm(true);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={errors.title && touched.title}
                    label="Book Name"
                    name="title"
                    fullWidth
                    className={classes.textField}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.title && touched.title && errors.title}
                    margin="normal"
                  />

                  <TextField
                    error={errors.author && touched.author}
                    label="Author"
                    name="author"
                    fullWidth
                    className={classes.textField}
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.author && touched.author && errors.author
                    }
                    margin="normal"
                  />
                  <DialogActions>
                    <Button
                      type="button"
                      className="outline"
                      variant="contained"
                      color="primary"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
//------------------------------------------------------------//
