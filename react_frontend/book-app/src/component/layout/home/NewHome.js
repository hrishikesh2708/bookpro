import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  LinearProgress,
  Container,
  Grid,
} from "@material-ui/core";
import { homejsx } from "../../componentCSS";
import { useSelector, useDispatch } from "react-redux";
import { delete_book, modify_book , add_book} from "../../../action/book_action";
import io from "socket.io-client"
export default function NewHome() {
  const classes = homejsx();
  const socket = io(`${process.env.REACT_APP_LOCALHOST}`)
  const state = useSelector((state) => state.set.set);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");

  const [data, setData] = useState(state);
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
  useEffect(() => { 
    // setData([...state,response]);   
    socket.emit('data from client',"hello from client");
    socket.on("Book Added", (bookInfo) => {
      // console.log("book added is called",bookInfo)
      setResponse(bookInfo)
      setData([...state,bookInfo])
    })
    socket.on("Book Deleted", (bookInfo) => {
      console.log("book deleted is called",bookInfo)
      // let del = data;
      // let j = del.findIndex((element) => element._id === bookInfo._id);
      // del.splice(j, 1);
      // setResponse(bookInfo)
      // setData(del)
    })
    
  }, [state,socket,response,data]);
  return (
    <>
    <p>response from socket {response.title} </p>
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
            <MaterialTable
              title={"Book List"}
              data={data}
              columns={columns}
              editable={{
                isEditable: (rowData) =>
                  store.user.USER_CURRENT_STATUS === true,
                isDeletable: (rowData) =>
                  rowData.user_id === store.user.USER_ID,
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
