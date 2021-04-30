import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { add_book } from "../../action/book_action";
import { add } from "../../api routes/api";
import toasting from "../../toast/toast";

function Add() {
  const [bookAdded, setbookAdded] = useState(false);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [errors, seterrors] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const refresh = (e) => {
    setauthor("");
    setbookAdded(false);
    settitle("");
    seterrors({});
  };
  const onSubmit = (e) => {
    var mes = "";
    var type = "";
    e.preventDefault();
    const bookData = {
      author: author,
      title: title,
    };
    console.log(bookData);
    const regex = new RegExp(title, "i");
    const postData = state.set.set.filter(({ title }) => title.match(regex));
    console.log(" postdata ", postData);
    if (postData.length === 0) {
      dispatch(add_book(bookData));
      mes = "Book added successfully!!";
      type = "success";
    } else {
      mes = "Book already exist!!";
      type = "error";
    }
    toasting(type, mes);
    // add(bookData)
    //   .then((value) => {
    //     console.log(value);
    //     setbookAdded(true);
    //     mes = "Book added successfully!!";
    //     type = "success";
    //   })
    //   .catch((e) => {
    //     console.log("err", e.response.status);
    //     if (e.response.status === 400) {
    //       mes = "Book already exist!!";
    //       type = "error";
    //     } else if (e.response.status === 422) {
    //       mes = "Book does not exist!!";
    //       type = "error";
    //     }
    //   });
    // toasting(type, mes);
  };

  return (
    <div>
      {bookAdded ? (
        <>
          <p>!!Book added!!</p>
          <Button onClick={refresh} variant="contained" color="primary">
            Add more
          </Button>
        </>
      ) : (
        <>
          <div>
            <h1>Enter details of book</h1>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div>
              <TextField
                id="title"
                label="Name"
                variant="outlined"
                placeholder="Enter book name"
                onChange={(e) =>
                  settitle(e.target.value.replace(/\s+/g, " ").trim())
                }
                value={title}
                error={errors.title}
              />
            </div>
            <div>
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                placeholder="Enter author name"
                onChange={(e) =>
                  setauthor(e.target.value.replace(/\s+/g, " ").trim())
                }
                value={author}
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
export default Add;
