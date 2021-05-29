import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0 , 2),
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: "75vh",
  },
  paper: {
    margin: theme.spacing(2, 2, 2, 4),
    padding: theme.spacing(0.5),
  },
  title: {
    margin: theme.spacing(2, 0, 0 , 2),
    padding: theme.spacing(1),
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
export default function Mybook() {
  const classes = useStyles();
  const state = useSelector((state) => state.set.privateBooks);
  return (
    <div className={classes.root}>
    <Typography variant="h4" noWrap className={classes.title}>
    My Books
    <Divider/>
    </Typography>
   
    <Paper elevation={8} className={classes.paper}>
    <TableContainer className={classes.container}>
            <Table stickyHeader={true}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Book Name</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Date & Time</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {state.map(({ title, author, date_added, _id }) => (
                  <StyledTableRow key={_id}>
                    <StyledTableCell>{title}</StyledTableCell>
                    <StyledTableCell>{author}</StyledTableCell>
                    <StyledTableCell>
                      {moment(date_added).format("MMMM Do YYYY, h:mm:ss a")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
       {/* <Paper elevation={8} className={classes.paper}>
          <Typography variant="h4" className={classes.title}>
            My Books
          </Typography>
          <TableContainer className={classes.container}>
            <Table stickyHeader={true}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Book Name</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Date & Time</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {state.map(({ title, author, date_added, _id }) => (
                  <StyledTableRow key={_id}>
                    <StyledTableCell>{title}</StyledTableCell>
                    <StyledTableCell>{author}</StyledTableCell>
                    <StyledTableCell>
                      {moment(date_added).format("MMMM Do YYYY, h:mm:ss a")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper> */}
    </div>
  );
}
