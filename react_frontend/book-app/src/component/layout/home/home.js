import React, { Component, useState } from "react";
// import ReactPaginate from "react-paginate";
// import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
// import {LinearProgress} from '@material-ui/core';
import { DataGrid, GridOverlay } from "@material-ui/data-grid";

function Home() {
  const state = useSelector((state) => state);
  console.log(" sate data ", state.set.set.slice(0, 100));
  const rows = state.set.set;

  const columns = [
    { field: "_id", hide: true },
    { field: "title", headerName: "Book Name", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
  ];
  // function CustomLoadingOverlay() {
  //   return (
  //     <GridOverlay>
  //       <div style={{ position: 'absolute', top: 0, width: '100%' }}>
  //         <LinearProgress />
  //       </div>
  //     </GridOverlay>
  //   );
  // }
  return (
    <GridOverlay>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          pagination
          rows={rows}
          columns={columns}
          getRowId={(row,index) => index.toString()}
          // components={{
          //   LoadingOverlay: CustomLoadingOverlay,
          // }}
          // loading
        />
      </div>
    </GridOverlay>
  );
}
export default Home;

// class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       offset: 0,
//       perPage: 10,
//       currentPage: 0,
//       loadingStatus: false,
//     };
//     this.handlePageClick = this.handlePageClick.bind(this);
//   }

//   dataFromStore() {
//     setTimeout(() => {
//       const data = this.props.set.set;
//       const slice = data.slice(
//         this.state.offset,
//         this.state.offset + this.state.perPage
//       );
//       const postData = slice.map((pd) => (
//         <React.Fragment key={pd._id}>
//           <li key={pd._id}>
//             <p>
//               <em>{pd.title}</em>
//             </p>
//             <p>
//               <em>{pd.author}</em>
//             </p>
//           </li>
//         </React.Fragment>
//       ));
//       // <>
//       // <p>hello</p>
//       // <DataGrid pageSize={5} rowsPerPageOptions={[5, 10, 20]} pagination {...this.props.set} />
//       // </>
//       this.setState({
//         pageCount: Math.ceil(data.length / this.state.perPage),
//         loadingStatus: true,
//         postData,
//         // data:this.props.set
//       });

//       console.log(this.props.set.set)
//     }, 2000);
//   }
//   handlePageClick = (e) => {
//     const selectedPage = e.selected;
//     const offset = selectedPage * this.state.perPage;

//     this.setState(
//       {
//         loadingStatus: false,
//         currentPage: selectedPage,
//         offset: offset,
//       },
//       () => {
//         this.dataFromStore();
//       }
//     );
//   };

//   componentDidMount() {
//     this.dataFromStore();
//   }
//   render() {
//     return (
//       <div>
//         {this.state.loadingStatus ? (
//           <>
//             {this.state.postData}
//             {/* <DataGrid pageSize={5} rowsPerPageOptions={[5, 10, 20]} pagination {...this.props.set} /> */}
//             <ReactPaginate
//               previousLabel={"prev"}
//               nextLabel={"next"}
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={this.state.pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={this.handlePageClick}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"active"}
//             />
//           </>
//         ) : (
//           <Loader
//             type="ThreeDots"
//             color="#00BFFF"
//             height={40}
//             width={40}
//             timeout={3000} //3 secs
//           />
//         )}
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   set: state.set,
// });
// export default connect(mapStateToProps, { set_store })(Home);
