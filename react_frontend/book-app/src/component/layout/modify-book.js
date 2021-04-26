import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { debounce } from 'lodash'
import Loader from "react-loader-spinner";
import { TextField, Button, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { set_store , modify_book} from "../../action/book_action";
class Modify extends Component {
  constructor() {
    super();
    this.state = {
      loadingStatus: false,
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
      this.state.newAuthor
    );
    const bookdetails = {
      _id: this.state.selectedBook_id,
      title: this.state.selectedBookTitle,
      author: this.state.newAuthor,
    };
    this.props.modify_book(bookdetails)
    axios
      .put(`${process.env.REACT_APP_LOCALHOST}/api/book-modify`, bookdetails)
      .then((res) => {
        console.log(res);
        console.log("book details updated");
        toast.success("book details updated!!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        this.setState({
          UpdateStatus: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  apiCall = debounce((name) => {
    const b = this.props.set
    const regex = new RegExp(name,'i')
    const postData = b.filter(({title}) => title.match(regex))
    console.log(" postdata ", postData)
      if (postData.length > 0) {
        this.setState({
          loadingStatus: false,
          data: postData,
        });
        toast("book present!!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        this.setState({
          bookPresent: "Book not found",
          loadingStatus: false,
        });
        toast.warn("book not present!!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    // axios
    // .get(`${process.env.REACT_APP_LOCALHOST}/api/search/` + name)
    // .then((res) => {
    //   this.setState({
    //     bookPresent: "",
    //   });
    //   console.log(res.data);
    //   if (res.data.length > 0) {
    //     this.setState({
    //       loadingStatus: false,
    //       data: res.data,
    //     });
    //     toast("book present!!", {
    //       autoClose: 2000,
    //       hideProgressBar: true,
    //     });
    //   } else {
    //     this.setState({
    //       bookPresent: "Book not found",
    //       loadingStatus: false,
    //     });
    //     toast.warn("book not present!!", {
    //       autoClose: 2000,
    //       hideProgressBar: true,
    //     });
    //   }
    // });
  },1000) 
  handleChange = (e) => {
    const name = e.target.value.trim();
    console.log("handle change called", name);
    this.setState({
      bookname: name,
      loadingStatus: true,
    });
    if (name.length > 1) {
      this.apiCall(name)
    }
    setTimeout(() => {
      if (name.length <= 1) {
        this.setState({
          data: [],
          loadingStatus: false
        });
        toast.dismiss()
      }
    }, 1000);

  };
  handleClick = (e) => {
    console.log(e._id);
    this.setState({
      showComponent: true,
      selectedBookAuthor: e.authors,
      selectedBookTitle: e.title,
      selectedBook_id: e._id,
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
            <Button variant="contained" color="primary" onClick={this.refresh}>
              Back
            </Button>
          </>
        ) : (
          <>
            <div style={{ paddingLeft: "11.250px" }}>
              <h1>Enter name of book you want to update</h1>
            </div>
            <div>
            <TextField id="outlined-basic" label="Search for books" variant="outlined" placeholder="Search for books" onChange={this.handleChange} />
              {this.state.loadingStatus ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={40}
                  width={40}
                  timeout={3000} //3 secs
                />
              ) : (
                <>
                  {this.state.bookPresent === "Book not found" ? (
                    <p>Book not found please add book to update</p>
                  ) : (
                    <>
                      <ul>
                        {this.state.data.map((item) => (
                          <li key={item._id}>
                            <p>{item.title}</p>
                            <p>{item.author}</p>
                            <Fab onClick={this.handleClick.bind(this, item)}>
                              <EditIcon />
                            </Fab>
                            {this.state.showComponent &&
                            item._id === this.state.selectedBook_id ? (
                              <form noValidate onSubmit={this.onSubmit}>
                                <TextField
                                  id="newAuthor"
                                  label="Author Name"
                                  variant="outlined"
                                  placeholder="Enter name of new Author"
                                  onChange={this.onChange}
                                  value={this.state.newAuthor}
                                />
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                >
                                  submit
                                </Button>
                              </form>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  set : state.set
})
export default connect(mapStateToProps,{set_store,modify_book})(Modify);
