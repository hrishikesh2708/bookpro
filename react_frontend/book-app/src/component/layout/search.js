import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { set_store } from "../../action/book_action";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      bookStatus: true,
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const name = e.target.value.replace(/\s+/g, " ").trim();
    console.log("handle change called", name);
    if (name.length > 1) {
      // const c = this.props.set;
      const b = Object.values(this.props.set);
      // console.log(c);
      console.log(b);
      const regex = new RegExp(name, "i");
      const postData = b.filter(({ title }) => title.match(regex));
      console.log(" postdata ", postData);
      if (postData.length === 0) {
        this.setState({
          bookStatus: false,
          data: postData,
        });
        toast.error("No book found!");
      } else {
        this.setState({
          bookStatus: true,
          data: postData,
        });
      }
    }

    if (name.length <= 1) {
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
const mapStateToProps = (state) => ({
  set: state.set,
});
export default connect(mapStateToProps, { set_store })(Search);
