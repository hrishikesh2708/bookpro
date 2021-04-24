import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TextField, Button} from '@material-ui/core';
class Add extends Component {
  constructor() {
    super();
    this.state = {
      bookAdded: false,
      title: "",
      author: "",
      errors: {},
    };
  }

  refresh = (e) => {
    this.setState({
      bookAdded: false,
      title: "",
      author: "",
      errors: {},
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      author: this.state.author,
      title: this.state.title,
    };
    console.log(bookData);
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}/api/book-addition`, bookData)
      .then((res) => {
        console.log(res);
        this.setState({
          bookAdded: true,
        });
        toast.success("Book added successfully!!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((res) => {
        console.log(res);
        console.log(res.response.status);
        if (res.response.status === 400) {
          toast.error("Book already exist!!", {
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else if (res.response.status === 422) {
          toast.error("input can not be empty!!", {
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.state.bookAdded ? (
          <>
            <p>!!Book added!!</p>
            <Button onClick={this.refresh} variant="contained" color="primary">Add more</Button>
          </>
        ) : (
          <>
            <div>
              <h1>Enter details of book</h1>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <TextField id="title" label="Name" variant="outlined" placeholder="Enter book name" onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}/>
              </div>
              <div>
                <TextField id="author" label="Author" variant="outlined" placeholder="Enter author name" onChange={this.onChange}
                  value={this.state.author}
                  error={errors.author}/>
              </div>
              <div>
                <Button variant="contained" color="primary"
                  type="submit"
                >
                  submit
                </Button>
              </div>
            </form>
          </>
        )}
        <ToastContainer />
      </div>
    );
  }
}
export default Add;
