// import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";
// import {
//   LinearProgress,
//   Container,
//   Grid,
// } from "@material-ui/core";
// import { homejsx } from "../../componentCSS";
// import { ToastContainer } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { delete_book, modify_book , add_book} from "../../../action/book_action";
// import io from "socket.io-client"
// import toasting from "../../../toast/toast";
// export default function NewHome() {
//   const classes = homejsx();
//   const socket = io(`${process.env.REACT_APP_LOCALHOST}`)
//   const state = useSelector((state) => state.set.set);
//   const store = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const [response, setResponse] = useState("");

//   const [data, setData] = useState(state);
//   const columns = [
//     {
//       field: "_id",
//       title: "ID",
//       editable: false,
//       hidden: true,
//       sorting: false,
//     },
//     { field: "title", title: "Book Name", editable: false, sorting: false },
//     { field: "author", title: "Author", sorting: false },
//     {
//       field: "date_added",
//       title: "Date Added",
//       editable: false,
//       hidden: true,
//       defaultSort: "desc",
//     },
//   ];
//   useEffect(() => {
//     // setData([...state,response]);
//     socket.emit('data from client',"hello from client");
//     socket.on("Book Added", (bookInfo) => {
//       console.log("book added is called",bookInfo)
//       if(bookInfo){
//         toasting("success", "New Book Added")
//       }
//       setResponse(bookInfo)
//       setData([...state,bookInfo])
//     })
//     // socket.on("Book Deleted", (bookInfo) => {
//     //   console.log("book deleted is called",bookInfo)
//     //   // let del = data;
//     //   // let j = del.findIndex((element) => element._id === bookInfo._id);
//     //   // del.splice(j, 1);
//     //   // setResponse(bookInfo)
//     //   // setData(del)
//     // })

//   }, [state,socket,response,data]);
//   return (
//     <>
//     <p>response from socket {response.title} </p>
//       {store.set.loading_status ? (
//         <div className={classes.load}>
//           <LinearProgress />
//         </div>
//       ) : (
//         <></>
//       )}

//       <Container className={classes.margin}>
//         <Grid
//           container
//           spacing={2}
//           direction="row"
//           justify="space-around"
//           alignItems="flex-start"
//         >
//           <Grid item xs>
//             <MaterialTable
//               title={"Book List"}
//               data={data}
//               columns={columns}
//               editable={{
//                 isEditable: (rowData) =>
//                   store.user.USER_CURRENT_STATUS === true,
//                 isDeletable: (rowData) =>
//                   rowData.user_id === store.user.USER_ID,
//                 onRowUpdate: (newData, oldData) =>
//                   new Promise((resolve, reject) => {
//                     console.log(newData, oldData);
//                     dispatch(
//                         modify_book({
//                           newData: newData,
//                           oldData: oldData,
//                           token: localStorage.getItem("jwtToken"),
//                         })
//                       );
//                       resolve();
//                   }),
//                 onRowDelete: (selectedRow) =>
//                   new Promise((resolve, reject) => {
//                     console.log(selectedRow);
//                       const index = selectedRow._id;
//                       dispatch(
//                         delete_book({
//                           id: index,
//                           token: localStorage.getItem("jwtToken"),
//                         })
//                       );
//                       resolve();
//                   }),
//               }}
//               options={{
//                 actionsColumnIndex: -1,
//                 loadingType: "linear",
//                 sorting: true,
//               }}
//             />
//           </Grid>
//           {/* {store.user.USER_CURRENT_STATUS ? (
//             <Grid item xs={4}>
//               <Recent />
//             </Grid>
//           ) : (
//             <></>
//           )} */}
//         </Grid>
//       </Container>
//       <ToastContainer/>
//     </>
//   );
// }















//hooks and action
import React, { useEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  delete_book,
  modify_book,
  add_book,
} from "../../../action/book_action";
import toasting from "../../../toast/toast";
import PropTypes from "prop-types";
import io from "socket.io-client";

// material ui icon
import FirstPageIcon from "@material-ui/icons/FirstPage";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

//material ui components
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
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
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
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
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    borderRadius: "16px",
    padding: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2, 0,2),
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
}))(TableRow);

export default function NewHome() {
  const classes = useStyles();
  const socket = io(`${process.env.REACT_APP_LOCALHOST}`);
  const state = useSelector((state) => state.set.set);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [data, setData] = useState([...state,...state,...state]);
  const [bookStatus, setbookStatus] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const dense = false;

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
  const handleChange = (e) => {
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
        setData(postData);
      }
    }
    if (name.length <= 1) {
      setData(state);
      setbookStatus(false);
    }
  };
  useEffect(() => {
    // var data = [...state,...state,...state]
    setData(data);
    socket.emit("data from client", "hello from client");
    socket.on("Book Added", (bookInfo) => {
      // console.log("book added is called",bookInfo)
      setResponse(bookInfo);
      setData([...state, bookInfo]);
    });
    socket.on("Book Deleted", (bookInfo) => {
      console.log("book deleted is called", bookInfo);
      // let del = data;
      // let j = del.findIndex((element) => element._id === bookInfo._id);
      // del.splice(j, 1);
      // setResponse(bookInfo)
      // setData(del)
    });
  }, [state, socket, response, data]);
  return (
    <>
      <Container>
        <Paper elevation={5} className={classes.paper}>
          <Grid container alignItems="flex-end" >
            <Grid item xs={5} >
            <Typography colSpan={4} variant="h4" className={classes.title}>
              Book list
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
                    onChange={handleChange}
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
                  .map(({ _id, title, author, date_added }) => (
                    <StyledTableRow hover key={_id}>
                      <StyledTableCell>{_id}</StyledTableCell>
                      <StyledTableCell>{title}</StyledTableCell>
                      <StyledTableCell>{author}</StyledTableCell>
                      <StyledTableCell>{date_added}</StyledTableCell>
                      <StyledTableCell>Actions</StyledTableCell>
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