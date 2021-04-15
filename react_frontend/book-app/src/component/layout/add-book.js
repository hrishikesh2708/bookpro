import React, { Component } from "react";
import axios from 'axios';
class Add extends Component {
    constructor() {
        super();
        this.state = {
          id : 1,
          title: "",
          author: "",
          errors: {}
        };
        
      }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
        const bookData = {
              id : this.state.id,
              authors: this.state.author,
              title: this.state.title
            };
        console.log(bookData);
        axios
        .post("http://localhost:4201/api/books/book-add", bookData)
        // .then(res =>{       
        //   console.log("book added")
        //   return res.json(res)})
          .then(res =>{
            console.log(res)
          })
        .catch(err =>{console.log(err)});
        
      };
    render() {
        const { errors } = this.state;
    return (
      
      <div>
      <div style={{ paddingLeft: "11.250px" }}>
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
              marginTop: "1rem"
            }}
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
    );
  }
}
export default Add;