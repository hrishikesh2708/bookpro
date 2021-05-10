import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  LinearProgress,
  Container,
  Grid,
  // Paper,
  // Tooltip,
} from "@material-ui/core";
import { homejsx } from "../../componentCSS";
import { useSelector, useDispatch } from "react-redux";
// import Recent from "../recent";
import { delete_book, modify_book } from "../../../action/book_action";
// import socketIOClient from "socket.io-client";

export default function NewHome() {
  const classes = homejsx();
  const state = useSelector((state) => state.set.set);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [response, setResponse] = useState("");

  const [data, setData] = useState();
  const columns = [
    {
      field: "_id",
      title: "ID",
      editable: false,
      hidden: true,
      sorting: false,
    },
    { field: "title", title: "Book Name", editable: false, sorting: false },
    { field: "author", title: "Author", sorting: false },
    {
      field: "date_added",
      title: "Date Added",
      editable: false,
      hidden: true,
      defaultSort: "desc",
    },
  ];
  // useEffect(() => {
  //   const socket = socketIOClient(`${process.env.REACT_APP_LOCALHOST}/api/getbook`);
  //   socket.on("bookDetails", data => {
  //     setResponse(data);
  //   });
  // }, [response]);
  useEffect(() => {
    setData(state);
  }, [state]);
  return (
    <>
    {/* <p>response from socket {response} </p> */}
      {store.set.loading_status ? (
        <div className={classes.load}>
          <LinearProgress />
        </div>
      ) : (
        <></>
      )}

      <Container className={classes.margin}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item xs>
            {/* <Paper elevation={5} className={classes.paper}> */}
            <MaterialTable
              title={"Book List"}
              data={data}
              columns={columns}
              editable={{
                isEditable: (rowData) =>
                  store.user.USER_CURRENT_STATUS === true,
                // isDeletable: (rowData) =>
                //   rowData.user_id === store.user.USER_ID,
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    console.log(newData, oldData);
                    setTimeout(() => {
                      dispatch(
                        modify_book({
                          newData: newData,
                          oldData: oldData,
                          token: localStorage.getItem("jwtToken"),
                        })
                      );
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      console.log(selectedRow);
                      const index = selectedRow._id;
                      dispatch(
                        delete_book({
                          id: index,
                          token: localStorage.getItem("jwtToken"),
                        })
                      );
                      resolve();
                    }, 1000);
                  }),
              }}
              options={{
                actionsColumnIndex: -1,
                loadingType: "linear",
                sorting: true,
              }}
            />
            {/* </Paper> */}
          </Grid>
          {/* {store.user.USER_CURRENT_STATUS ? (
            <Grid item xs={4}>
              <Recent />
            </Grid>
          ) : (
            <></>
          )} */}
        </Grid>
      </Container>
    </>
  );
}
