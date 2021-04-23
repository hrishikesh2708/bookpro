import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { view_book } from "../../../action/view_book";
class Home extends Component {
  constructor() {
      super();
      this.state = {
          offset: 0,
          data: [],
          perPage: 10,
          currentPage: 0,
          loadingStatus : false
      };
      this.handlePageClick = this
          .handlePageClick
          .bind(this);
  }

  receivedData() {
      axios
        .get(`${process.env.REACT_APP_LOCALHOST}/api/boook`)
        .then(res => {
            console.log(res.data.message)
        })
      axios
          .get(`${process.env.REACT_APP_LOCALHOST}/api/getbook`)
          .then(res => {
                // console.log(res.data)
              const data = res.data;
              this.props.view_book(res.data)
              const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
              const postData = slice.map(pd => <React.Fragment key = {pd._id}>
                  <li key = {pd._id}><p><em>{pd.title}</em></p><p><em>{pd.author}</em></p></li>
              </React.Fragment>)

              this.setState({
                  pageCount: Math.ceil(data.length / this.state.perPage),
                  loadingStatus : true,
                  postData
              })
          });
  }
  handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;

      this.setState({
          loadingStatus : false,
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.receivedData()
      });

  };
 
  componentDidMount() {
      this.receivedData()
  }
  render() {
      return (
          <div>
            {this.state.loadingStatus ? (
                <>
                {this.state.postData}
              <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}    
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
                  </>
            ) : (
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={40}
                    width={40}
                    timeout={3000} //3 secs
                />
            )}
          </div>

      )
  }
}
const mapStateToProps = state => ({
    book: state.book,
  })
 export default connect(mapStateToProps,{view_book})(Home);