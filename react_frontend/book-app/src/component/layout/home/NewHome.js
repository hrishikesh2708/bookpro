//hooks and action
import React, { useEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
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
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import * as moment from "moment";

// material ui icon
import FirstPageIcon from "@material-ui/icons/FirstPage";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//material ui components
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  Slide,
  TableRow,
  LinearProgress,
  TableBody,
  TableCell,
  TextField,
  Grid,
  TableSortLabel,
  TableContainer,
  IconButton,
  TablePagination,
} from "@material-ui/core";

// ------------------Pagination------------------//
const useStyles1 = makeStyles((theme) => ({
  root: {
    align: "right",
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// -------------------------------------------------------------//

//-------------------Sorting------------------------------------//
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "_id", numeric: false, disablePadding: false, label: "Id" },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Book Name",
  },
  { id: "author", numeric: false, disablePadding: false, label: "Author" },
  {
    id: "date_added",
    numeric: false,
    disablePadding: false,
    label: "Date & Time",
  },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
//--------------------------------------------------------//

//-----------------Main Component-------------------------//
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  load: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: "75vh",
  },
  box: {
    margin: theme.spacing(2, 0, 2),
    width: "40%",
    backgroundColor: "#f5f5f5",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  title: {
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
  addEffect: {
    backgroundColor: "#c5cae9",
  },
  addCommit: {
    backgroundColor: "#7986cb",
  },
  addRollback: {
    backgroundColor: "#3f51b5",
  },
  modifyEffect: {
    backgroundColor: "#e1bee7",
  },
  modifyCommit: {
    backgroundColor: "#ce93d8",
  },
  modifyRollback: {
    backgroundColor: "#9c27b0",
  },
  deleteEffect: {
    backgroundColor: "#f44336",
  },
  deleteCommit: {
    backgroundColor: "#ef9a9a",
  },
  deleteRollback: {
    backgroundColor: "#ffcdd2",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#424242",
    color: theme.palette.common.white,
    "&:active": {
      color: theme.palette.common.white,
    },
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.disabledBackground,
    // },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewHome() {
  const classes = useStyles();
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
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
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
    : classes.addRollback;
  const customDel = store.set.deleteEffectCall
    ? classes.deleteEffect
    : store.set.deleteCommitCall
    ? classes.deleteCommit
    : classes.deleteRollback;
  const customColor = store.set.addEffectCall
    ? customAdd
    : store.set.modifyEffectCall
    ? customModify
    : store.set.deleteEffectCall
    ? customDel
    : null;
  const customId =
    customColor === customAdd
      ? store.set.bookAdded._id
      : customColor === customModify
      ? store.set.bookModified._id
      : customColor === customDel
      ? store.set.bookTobeDeleted._id
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
        errormessage = "No book found!";
        toasting("error", errormessage);
      } else {
        setbookStatus(true);
        setserResult(postData);
      }
    }
    if (name.length <= 1) {
      setbookStatus(false);
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
    let eventSource = new EventSource(
      `${process.env.REACT_APP_LOCALHOST}/api/stream`
    );
    eventSource.onopen = (e) => {
      console.log("client name ", e);
    };
    eventSource.onmessage = (e) => {
      let res = JSON.parse(e.data);
      console.log("data sent by server p", Object.keys(res)[0]);
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
  }, []);
  useEffect(() => {
    console.log("useeffect is called");
    setData(state);
    if (bookStatus) {
      setData(serResult);
      console.log(serResult, "search result");
    }
  }, [store]);

  return (
    <>
      {store.set.loading_status ? (
        <div className={classes.load}>
          <LinearProgress />
        </div>
      ) : (
        <></>
      )}
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
      <Container>
        <Paper elevation={5} className={classes.paper}>
          <Grid container alignItems="flex-end">
            <Grid item xs={5}>
              <Typography variant="h4" className={classes.title}>
                Book list
                <IconButton
                  size="small"
                  disabled={store.user.USER_CURRENT_STATUS === false}
                  edge="end"
                  onClick={() => setaddBookCall(true)}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={7} className={classes.box}>
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
                    onChange={handleSearch}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                      className={_id === customId ? customColor : null}
                    >
                      <StyledTableCell>{_id}</StyledTableCell>
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
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Paper>
      </Container>
      <ToastContainer />
    </>
  );
}
//------------------------------------------------------------//
