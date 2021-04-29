import React, { Component } from "react";
import { get_books } from "../../api routes/api";
import { TextField } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bookStatus: true,
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    get_books().then((value) => {
      localStorage.setItem("books", JSON.stringify(value));
    });
  }
  handleChange = (e) => {
    const name = e.target.value.replace(/\s+/g, " ").trim();
    console.log("handle change called", name);
    const regex = new RegExp(name, "i");
    if (name.length > 1) {
      const b = JSON.parse(localStorage.getItem("books"));
      const postdata = b.filter(({ title }) => title.match(regex));
      // console.log(postdata)
      if (postdata.length === 0) {
        this.setState({
          bookStatus: false,
          data: postdata,
        });
        toast.error("No book found!");
      } else {
        this.setState({
          bookStatus: true,
          data: postdata,
        });
      }
    }
    if (name.length === 0) {
      this.setState({
        data: [],
      });
    }
  };
  render() {
    return (
      <div>
        <TextField
          id="outlined-basic"
          label="Search for books"
          variant="outlined"
          placeholder="Search for books"
          onChange={this.handleChange}
        />
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
      </div>
    );
  }
}
