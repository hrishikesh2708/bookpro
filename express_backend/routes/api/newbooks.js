const express = require("express");
const validateBook = require("../../validation/book-add");
const router = express.Router();
const book = require("../../model/newbooks");
const { request, response } = require("express");
const axios = require("axios")

router.post("/", async (req, res) => {
    try {
       axios
            .get("https://www.googleapis.com/books/v1/volumes?q=printType=books&key=AIzaSyBXyenS7QTHcAyvosFhuEcSVa0UbzdSnFw")
            .then(response => {
                
                // console.log(title, authors, response.data.items[0].volumeInfo)
                // const new_book = new book ({
                //     title :response.body.title,
                //     authors :response.body.author
                // })
                for(i in response.data.items){
                    const {title, authors} = response.data.items[i].volumeInfo
                    console.log(title,authors,i)
                    const new_book = new book ({
                        title :title,
                        authors : authors ? authors[0] : ''
                    })
                    new_book.save()

                }
            })
    //   const x = await book.find();
    //   res.json(x);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.get("/", async (req, res) => {
  try {
    const x = await book.find();
    res.json(x.length);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// router.post("/book-add", async (req, res) => {
//   const { errors, isValid } = validateBook(req.body);
//   if (!isValid) {
//     return res.status(422).json(errors);
//   } else {
//     const reg = new RegExp("(?:^|W)" + req.body.title + "(?:$|W)", "i");
//     console.log(req.body.title);
//     const x = await book.findOne({ title: reg });
//     console.log(x);
//     if (x == null) {
//       const newbook = new book({
//         id: req.body.id,
//         authors: req.body.authors,
//         title: req.body.title,
//       });
//       newbook.save().then((x) => {
//         res.json(x);
//       });
//     } else {
//       return res.status(400).json({ message: "book is already present!" });
//     }
//   }
// });
// router.put("/book-modify", async (req, res) => {
//   const x = await book.findOne({ _id: req.body._id });
//   if (x == null) {
//     return res.status(400).json({ message: "book is not present!" });
//   } else {
//     x.authors = req.body.authors;
//     x.save().then((x) => {
//       res.json(x);
//     });
//   }
// });
// router.get("/book-search/:bookname", async (req, res) => {
//   try {
//     const name = new RegExp(req.params.bookname, "i");
//     const x = await book.find({ title: name });
//     res.json(x);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
module.exports = router;
