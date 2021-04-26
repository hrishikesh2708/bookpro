import React, { Component } from "react";
// import axios from "axios";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField} from '@material-ui/core';
import  {debounce} from 'lodash'
import { connect } from "react-redux";
import {set_store } from "../../action/book_action";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      bookStatus: true,
      bookname: "",
      data: [],
      show: true,
      loadingStatus : true
    };
    this.handleChange = this.handleChange.bind(this);

  }
  apiCall = debounce((name) => {

    const c = this.props.set
    const b = Object.values(this.props.set)
    console.log(c)
    console.log(b)
    const regex = new RegExp(name,'i')
    // b.forEach(element => {
    //   console.log(element.title)
    // });
    // console.log(data)
    const postData = b.filter(({title}) => title.match(regex))
    console.log(" postdata ", postData)
      if (postData.length === 0) {
        this.setState({
          bookStatus: false,
        });
        toast.error("No book found!")
      } else {
        this.setState({
          bookStatus: true,
        });
      }
      this.setState({ 
        data: postData, 
      loadingStatus : true
    });
    // axios
    // .get(`${process.env.REACT_APP_LOCALHOST}/api/search/` + name)
    // .then((res) => {
    //   console.log(res.data.length);
    //   if (res.data.length === 0) {
    //     this.setState({
    //       bookStatus: false,
    //     });
    //     toast.error("No book found!")
    //   } else {
    //     this.setState({
    //       bookStatus: true,
    //     });
    //   }
    //   this.setState({ data: res.data, 
    //   loadingStatus : true});
    // });
  },500) 
  handleChange = (e) => {
    const name = e.target.value.trim();
    console.log("handle change called", name);
    this.setState({ 
      bookname: name,
      loadingStatus : false
    });
    if (name.length > 1) {
      this.apiCall(name)
    }

    if (name.length <= 1 ) {
      console.log("hi")
      this.setState({
        data: [],
        loadingStatus : true
      });
    }


    
  };

  render() {
    return (
      <div>
      <TextField id="outlined-basic" label="Search for books" variant="outlined" placeholder="Search for books" onChange={this.handleChange} />
        {this.state.loadingStatus ? (
          <>

        {this.state.bookStatus === true ? (
          <>
            <ul>
              {this.state.data.map((item) => (
                <li key={item._id}>
                  <p>{item.title}</p>
                  <p>{item.author}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
          <p>
            <b>
              <em>No book found</em>
            </b>
          </p>
            <ToastContainer />
          </>
        )}
        </>
        ):(
          <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={40}
                    width={40}
                    timeout={3000} //3 secs
                />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  set : state.set
})
export default connect(mapStateToProps,{ set_store})(Search);