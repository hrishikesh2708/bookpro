import React, { Component } from "react";
import axios from 'axios';
class Modify extends Component {
     
    constructor() {
        super();
        this.state = {
          id : 1,
          title: "",
          author: "",
          bookname :"",
          data : [],
          edit: "",
          errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        
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
        // console.log(bookData);
        axios
        .post("http://localhost:4201/api/books/book-add", bookData)
        .then(console.log("book added"))
        .catch(err =>{console.log(err)});
        
      };
      handleChange = (e) =>{
        const name = e.target.value;
        console.log('handle change called',name)
        this.setState({ bookname: name })
        if(name.length > 1){
        axios.get(`http://localhost:4201/api/books/book-search/`+ name)
              .then(res => {
                console.log(res.data)
                this.setState({ data : res.data })       
              })
            } 
        // console.log(this.state.data[1])
      }
      handleClick = (e) => {
        console.log(e);
      //  this.setState({edit : e})
      // //  axios.put
      //   console.log(this.state.edit)
      }
    render() {
        // const { errors } = this.state;
    return (
      
      <div>
      <div style={{ paddingLeft: "11.250px" }}>
        <h1>Enter name of book you want to update</h1>
      </div>
      <div>
        <input
            type="text"
            placeholder="Search for books"
            name= {this.state.bookname}
            value={this.state.bookname}
            onChange={this.handleChange}
        />
        <ul>
            {this.state.data.map( item =>(
              <li><p>{item.title}</p><p>{item.authors}</p><button onClick={this.handleClick.bind(this,item)}>Edit</button></li>
            ))}
        </ul> 
        </div>
      </div>
    );
  }
}
export default Modify;