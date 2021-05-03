import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import Recent from "../recent";
import { homejsx } from "../../componentCSS";

function Home() {
  const state = useSelector((state) => state);
  const rows = state.set.set;
  const classes = homejsx();
  const [loading, setloading] = useState(true);
  const columns = [
    { field: "_id", hide: true },
    { field: "title", headerName: "Book Name", flex: 1, type: "string" },
    { field: "author", headerName: "Author", flex: 1, type: "string" },
    {
      field: "date_added",
      headerName: "Date Added",
      flex: 1,
      type: "dateTime",
    },
  ];
  useEffect(() => {
    return () => {
      setloading(false);
    };
  });

  return (
    <>
      {loading ? (
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
            <Paper elevation={5} className={classes.paper}>
              <Box className={classes.box}>
                <Typography className={classes.sepration}>
                  Books List
                </Typography>
                <Box style={{ height: "65vh", width: "100%" }}>
                  <DataGrid
                    disableColumnMenu
                    pagination
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    sortingOrder={["desc", "asc"]}
                    sortModel={[
                      {
                        field: "title",
                        sort: "desc",
                      },
                    ]}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          {state.user.USER_CURRENT_STATUS ? (
            <Grid item xs={4}>
              <Recent />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </>
  );
}
export default Home;
