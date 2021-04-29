import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { set_store, add_book, modify_book } from "../../action/book_action";
import { add } from "../../api routes/api";

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
    this.setState({
      [e.target.id]: e.target.value.replace(/\s+/g, " ").trim(),
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      author: this.state.author,
      title: this.state.title,
    };
    console.log(bookData);
    const b = Object.values(this.props.set);
    const regex = new RegExp(this.state.title, "i");
    const postData = b.filter(({ title }) => title.match(regex));
    console.log(" postdata ", postData);
    if (postData.length === 0) {
      this.props.add_book(bookData);
      toast.success("Book added successfully!!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      toast.error("Book already exist!!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }

    add(bookData)
      .then((value) => {
        console.log(value);
        this.setState({
          // _id : res.data._id,
          bookAdded: true,
        });
        toast.success("Book added successfully!!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((e) => {
        console.log("err", e.response.status);
        var mes =""
        if (e.response.status === 400) {
          mes =" book already exist "
          // toast.error("Book already exist!!", {
          //   autoClose: 2000,
          //   hideProgressBar: true,
          // });
        } else if (e.response.status === 422) {
          mes =" book not exist "
        }
        toast.error(mes, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.state.bookAdded ? (
          <>
            <p>!!Book added!!</p>
            <Button onClick={this.refresh} variant="contained" color="primary">
              Add more
            </Button>
          </>
        ) : (
          <>
            <div>
              <h1>Enter details of book</h1>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <TextField
                  id="title"
                  label="Name"
                  variant="outlined"
                  placeholder="Enter book name"
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                />
              </div>
              <div>
                <TextField
                  id="author"
                  label="Author"
                  variant="outlined"
                  placeholder="Enter author name"
                  onChange={this.onChange}
                  value={this.state.author}
                  error={errors.author}
                />
              </div>
              <div>
                <Button variant="contained" color="primary" type="submit">
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
const mapStateToProps = (state) => ({
  set: state.set,
});
export default connect(mapStateToProps, { set_store, add_book, modify_book })(
  Add
);
