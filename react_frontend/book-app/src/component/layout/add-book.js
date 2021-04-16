import React, { Component } from "react";
import axios from "axios";
class Add extends Component {
  constructor() {
    super();
    this.state = {
      bookAdded: false,
      id: 1,
      title: "",
      author: "",
      errors: {},
    };
  }
  refresh = (e) => {
    this.setState({
      bookAdded: false,
      id: 1,
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
      id: this.state.id,
      authors: this.state.author,
      title: this.state.title,
    };
    console.log(bookData);
    axios
      .post("http://localhost:4201/api/books/book-add", bookData)
      // .then(res =>{
      //   console.log("book added")
      //   return res.json(res)})
      .then((res) => {
        console.log(res);
        this.setState({
          bookAdded: true,
        });
      })
      .catch((res) => {
        console.log(res);
        console.log(res.response.status);
        if (res.response.status === 400) {
          alert("Book already exist!!");
        } else if (res.response.status === 422) {
          alert("input can not be empty!!");
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
            <button onClick={this.refresh}>Add more</button>
          </>
        ) : (
          <>
            <div>
              <h1>Enter details of book</h1>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="title">Name:</label>
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <input
                  onChange={this.onChange}
                  value={this.state.author}
                  error={errors.author}
                  id="author"
                  type="text"
                />
              </div>
              <div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                >
                  submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    );
  }
}
export default Add;
