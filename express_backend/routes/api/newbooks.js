const express = require("express");
const validateBook = require("../../validation/book-add");
const router = express.Router();
const book = require("../../model/newbooks");
const { request, response } = require("express");
const axios = require("axios");
const { findOne } = require("../../model/newbooks");

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

router.get("/getbook", async (req, res) => {
  try {
    const x = await book.find();
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/book-addition", async (req, res) => {
  console.log("request:", req.body);
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
router.put("/book-modify", async (req, res) => {
  const x = await book.findOne({ _id: req.body._id });
  if (x == null) {
    return res.status(400).json({ message: "book is not present!" });
  } else {
    x.author = req.body.author;
    x.save().then((x) => {
      res.json(x);
    });
  }
});
router.delete("/book-delete/:id/:user", async (req, res) => {
  console.log(req.body);
  const z = await book.findOne({ _id: req.params.id });
  console.log(req.params.user ," ==== ",z.user_id)
  if (z.user_id === req.params.user) {
    // book.deleteOne({ id: req.params.id }, function (err,data) {
    // if (!err) {
    //   console.log("Deleted");
    //   return res.json(data);
    // }
    // });
    await book.findByIdAndRemove(req.params.id, req.body, function (err, data) {
    if (!err) {
      console.log("Deleted");
      return res.json(data);
    }
  });
  }
  else{
    return res.status(401).json({})
  }
  // await book.findByIdAndRemove(req.params.id, req.body, function (err, data) {
  //   if (!err) {
  //     console.log("Deleted");
  //     return res.json(data);
  //   }
  // });
});
module.exports = router;
