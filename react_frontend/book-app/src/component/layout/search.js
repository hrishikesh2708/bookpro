import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import toasting from "../../toast/toast";
function Search() {
  const [bookStatus, setbookStatus] = useState(true);
  const [data, setdata] = useState([]);
  const state = useSelector((state) => state);
  const handleChange = (e) => {
    var errormessage = "";
    const name = e.target.value.replace(/\s+/g, " ").trim();
    const regex = new RegExp(name, "i");
    console.log("handle change called", name);
    if (name.length > 1) {
      const postData = state.set.set.filter(({ title }) => title.match(regex));
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
