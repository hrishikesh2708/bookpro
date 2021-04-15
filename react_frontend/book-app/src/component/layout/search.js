import React, {Component} from "react";
import axios from 'axios';
export default class Search extends Component{
  constructor() {
    super();
    this.state = {
        bookname :"",
        data : [],
        show : true
    };
    this.handleChange = this.handleChange.bind(this);
}

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
}
  render(){

    return (
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
              <li><p>{item.title}</p><p>{item.authors}</p></li>
            ))}
        </ul> 
        </div>
    );
  }
  

}

