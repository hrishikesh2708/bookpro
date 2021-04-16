import React, { Component } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
class Modify extends Component {
  constructor() {
    super();
    this.state = {
      bookPresent: "",
      bookname: "",
      data: [],
      newAuthor: "",
      selectedBook_id: "",
      selectedBookid: "",
      selectedBookAuthor: "",
      selectedBookTitle: "",
      showComponent: false,
      UpdateStatus: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  refresh = () => {
    this.setState({
      UpdateStatus: false,
      showComponent: false,
      bookname: "",
      data: [],
      newAuthor: "",
      selectedBook_id: "",
      selectedBookid: "",
      selectedBookAuthor: "",
      selectedBookTitle: "",
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log("onSummit event is called");
    console.log(
      e.target.value,
      " ",
      this.state.selectedBookAuthor,
      " ",
      this.state.selectedBookTitle,
      " ",
      this.state.selectedBook_id,
      " ",
      this.state.selectedBookid,
      " ",
      this.state.newAuthor
    );
    const bookdetails = {
      _id: this.state.selectedBook_id,
      id: this.state.selectedBookid,
      title: this.state.selectedBookTitle,
      authors: this.state.newAuthor,
    };
    axios
      .put(`http://localhost:4201/api/books/book-modify`, bookdetails)
      .then((res) => {
        console.log(res);
        console.log("book details updated");
        this.setState({
          UpdateStatus: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (e) => {
    const name = e.target.value;
    console.log("handle change called", name);
    this.setState({ bookname: name });
    if (name.length > 1) {
      axios
        .get(`http://localhost:4201/api/books/book-search/` + name)
        .then((res) => {
          this.setState({
            bookPresent: "",
          });
          console.log(res.data);
          if (res.data.length > 0) {
            this.setState({
              data: res.data,
            });
          } else {
            this.setState({
              bookPresent: "Book not found",
            });
          }
        });
    }
    if (name.length === 0) {
      this.setState({
        data: [],
      });
    }
  };
  handleClick = (e) => {
    console.log(e);
    this.setState({
      showComponent: true,
      selectedBookAuthor: e.authors,
      selectedBookTitle: e.title,
      selectedBook_id: e._id,
      selectedBookid: e.id,
    });
    console.log(this.state.showComponent);
  };
  render() {
    return (
      <div>
        {this.state.UpdateStatus ? (
          <>
            <h1>!!Book Updated!!</h1>
            <p>
              Author of name{" "}
              <b>
                <em>{this.state.selectedBookTitle}</em>
              </b>{" "}
              was updated from{" "}
              <b>
                <em>{this.state.selectedBookAuthor}</em>
              </b>{" "}
              to{" "}
              <b>
                <em>{this.state.newAuthor}</em>
              </b>
            </p>
            <button onClick={this.refresh}>Back</button>
          </>
        ) : (
          <>
            <div style={{ paddingLeft: "11.250px" }}>
              <h1>Enter name of book you want to update</h1>
            </div>
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
              {this.state.bookPresent === "Book not found" ? (
                <p>Book not found please add book to update</p>
              ) : (
                <>
                  <ul>
                    {this.state.data.map((item) => (
                      <li key={item._id}>
                        <p>{item.title}</p>
                        <p>{item.authors}</p>
                        <button onClick={this.handleClick.bind(this, item)}>
                          Edit
                        </button>
                        {this.state.showComponent &&
                        item._id === this.state.selectedBook_id ? (
                          <form noValidate onSubmit={this.onSubmit}>
                            <input
                              type="text"
                              placeholder="Enter name of new Author"
                              value={this.state.newAuthor}
                              onChange={this.onChange}
                              id="newAuthor"
                            />
                            <button type="submit">submit</button>
                          </form>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Modify;
