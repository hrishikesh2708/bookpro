import { get_books } from "../../api routes/api";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import toasting from "../../toast/toast";

function Search() {
  const [bookStatus, setbookStatus] = useState(true);
  const [data, setdata] = useState([]);
  useEffect(() => {
    get_books().then((value) => {
      localStorage.setItem("books", JSON.stringify(value));
    });
  });
  const handleChange = (e) => {
    var errormessage = "";
    const name = e.target.value.replace(/\s+/g, " ").trim();
    const regex = new RegExp(name, "i");
    console.log("handle change called", name);
    if (name.length > 1) {
      const b = JSON.parse(localStorage.getItem("books"));
      // console.log(b);
      const postData = b.data.filter(({ title }) => title.match(regex));
      // console.log(" postdata ", postData);
      if (postData.length === 0) {
        setbookStatus(false);
        setdata(postData);
        errormessage = "No book found!";
        toasting("error", errormessage);
      } else {
        setbookStatus(true);
        setdata(postData);
      }
    }

    if (name.length <= 1) {
      setdata([]);
    }
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search for books"
        variant="outlined"
        placeholder="Search for books"
        onChange={handleChange}
      />
      {bookStatus === true ? (
        <>
          <ul>
            {data.map((item) => (
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
    </>
  );
}
export default Search;
