const jwt_decode = require("jwt-decode");
const express = require("express");
const validateBook = require("../../validation/book-add");
const router = express.Router();
const book = require("../../model/newbooks");
// const User = require("../../model/user");
const { request, response } = require("express");
const axios = require("axios");
const { findOne } = require("../../model/newbooks");
const user = require("../../model/user");

router.get("/boook", async (req, res) => {
  try {
    const x = await book.find();
    if (x.length < 5000) {
      for (let i = 0; i < 5000 / 1000; i++) {
        // let limit = ( (5000-x.length) > 1000) ? 1000 : 5000-x.length
        let limit = 1000;
        let data = [];
        axios
          .get(`https://fakerapi.it/api/v1/books?_quantity=${limit}`)
          .then((response) => {
            for (i in response.data.data) {
              const new_book = new book({
                title: response.data.data[i].title,
                author: response.data.data[i].author,
              });
              data.push(new_book);
            }
            book.insertMany(data);
          });
      }

      res.json({ message: "books added " });
    } else {
      res.json({ message: "books up to date " });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getbook", async (req, res, next) => {
  // let io = req.app.get("io");
  // io.on("connection", (socket) => {
  //   // console.log('a user connected');
  //   socket.on("data from client", (msg) => {
  //     console.log("message: " + msg + socket.id);
  //   });
  // });
  try {
    const x = await book.find();
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/book-addition", async (req, res) => {
  console.log("request:", req.body);
  let io = req.app.get("io");
  const { errors, isValid } = validateBook(req.body);
  if (!isValid) {
    return res.status(422).json(errors);
  } else {
    const reg = new RegExp("^" + req.body.title + "$", "i");
    const x = await book.findOne({ title: req.body.title });
    if (x == null) {
      const newbook = new book({
        author: req.body.author,
        title: req.body.title,
        user_id: req.body.id,
      });
      newbook.save().then((x) => {
        res.json(x);
      });
      io.emit("Book Added", newbook);
    } else {
      return res.status(400).json({ message: "book is already present!" });
    }
  }
});
router.get("/search/:bookname", async (req, res) => {
  try {
    const name = new RegExp(req.params.bookname, "i");
    const x = await book.find({ title: name });
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/book-modify/:token", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  if (req.params.token !== "null") {
    let decode = jwt_decode(req.params.token);
    const client_exist = await user.findOne({ _id: decode.id });
    console.log(client_exist);
    const x = await book.findOne({ _id: req.body.newData._id });
    if (client_exist !== null) {
      if (x == null) {
        return res.status(400).json({ message: "book is not present!" });
      } else {
        x.author = req.body.newData.author;
        x.save().then((x) => {
          res.json(x);
        });
      }
    } else {
      res.status(401).json(req.body.oldData);
    }
  } else {
    res.status(404).json(req.body.oldData);
  }
});
router.delete("/book-delete/:id/:token", async (req, res) => {
  const z = await book.findOne({ _id: req.params.id });
  if (req.params.token !== "null") {
    console.log(req.params);
    let decode = jwt_decode(req.params.token);
    console.log(decode.id, " ==== ", z.user_id);
    if (z.user_id === decode.id) {
      // await book.findByIdAndRemove(
      //   req.params.id,
      //   req.body,
      //   function (err, data) {
      //     if (!err) {
      //       console.log("Deleted");
      //       return res.json(data);
      //     }
      //   }
      // );
      await book.deleteOne({ _id: req.params.id },      
          function (err) {
            if (!err) {
              console.log("Deleted");
            }
          })
    } else {
      return res.status(401).json({});
    }
  } else {
    res.status(404).json({});
  }
});
module.exports = router;
