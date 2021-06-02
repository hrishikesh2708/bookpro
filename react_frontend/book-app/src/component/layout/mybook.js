import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import * as moment from "moment";
import { mybooks, StyledTableCell, StyledTableRow} from "../componentCSS";

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
