import React, { Component } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: true,
      bookStatus: true,
      bookname: "",
      data: [],
      show: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios
        .get(`${process.env.REACT_APP_LOCALHOST}/api/getbook`)
        .then(res =>{ 
              this.setState({
              bookStatus: true,
            }); 
            localStorage.setItem("books",JSON.stringify(res.data))         
        })
  }
  handleChange = (e) => {
    const name = e.target.value;
    console.log("handle change called", name);
    const regex = new RegExp(name,'i')
    this.setState({
      bookname: name,
      loadingStatus : false
    });
    if (name.length > 1) {
        const b = JSON.parse(localStorage.getItem("books"))
        console.log(b[1000])
        const postdata = b.filter(({title}) => title.match(regex))
        console.log(postdata)
          if (postdata.length === 0) {
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
            data: postdata,
            loadingStatus :true
          });
      }
    if (name.length === 0) {
      this.setState({
        data: [],
        loadingStatus : true
      });
    }
  };
  render() {
    return (
      <div>
                <DebounceInput
          minLength={1}
          debounceTimeout={500}
          type="text"
          placeholder="Search for books"
          name={this.state.bookname}
          value={this.state.bookname}
          onChange={this.handleChange}
        />
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
