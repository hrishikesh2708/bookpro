import React, { Component } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      bookStatus: true,
      bookname: "",
      data: [],
      show: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios
        .get(`http://localhost:4201/api/books/book/`)
        .then(res =>{ 
              this.setState({
              bookStatus: true,
            }); 
            localStorage.setItem("books",res.data)         
        })
  }
  handleChange = (e) => {
    const name = e.target.value;
    console.log("handle change called", name);
    this.setState({ bookname: name });
    if (name.length > 2) {
        const b = JSON.stringify(localStorage.getItem("books"))
        console.log(b)
        const postdata = b.filter(d => d.title === name)
        console.log(postdata)
    //   axios
    //     .get(`http://localhost:4201/api/books/book-search/` + name)
    //     .then((res) => {
    //       console.log(res.data.length);
    //       if (res.data.length === 0) {
    //         this.setState({
    //           bookStatus: false,
    //         });
    //       } else {
    //         this.setState({
    //           bookStatus: true,
    //         });
    //       }
    //       this.setState({ data: res.data });
    //     });
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
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          type="text"
          placeholder="Search for books"
          name={this.state.bookname}
          value={this.state.bookname}
          onChange={this.handleChange}
        />
        {this.state.bookStatus === true ? (
          <>
            <ul>
              {this.state.data.map((item) => (
                <li key={item._id}>
                  <p>{item.title}</p>
                  <p>{item.authors}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            <b>
              <em>No book found</em>
            </b>
          </p>
        )}
      </div>
    );
  }
}
