import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Divider,
  TableRow,
  TableCell, 
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import * as moment from "moment";

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
const mybooks = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(0, 0, 0, 2),
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: "75vh",
    border : `1px solid ${theme.palette.secondary.light}`
  },
  paper: {
    margin: theme.spacing(2, 2, 2, 4),
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0, 0, 2),
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  divider: {
    background: theme.palette.divider,
  },
}));
export default function Mybook() {
  const classes = mybooks()
  const state = useSelector((state) => state.set.privateBooks);
  return (
    <div className={classes.root}>
    <Typography variant="h4" noWrap className={classes.title}>
    My Books
    <Divider classes={{root:classes.divider}}/>
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
    </div>
  );
}
