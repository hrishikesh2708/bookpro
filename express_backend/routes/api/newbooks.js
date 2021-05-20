const jwt_decode = require("jwt-decode");
const express = require("express");
const validateBook = require("../../validation/book-add");
const router = express.Router();
const book = require("../../model/newbooks");
const { request, response } = require("express");
const axios = require("axios");
const { findOne } = require("../../model/newbooks");
const user = require("../../model/user");
let  clients = [];

global.bookAdded = ""
global.bookEdited = ""

router.get("/sse-add", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  if(bookAdded !==""){
    res.write(`data: ${JSON.stringify({book_added:bookAdded})}\n\n`);
    // res.write(`data: ${JSON.stringify({book_edited:bookEdited})}\n\n`);
    bookAdded = ""
  }


  res.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
    res.end();
  });
});

router.get("/sse-modify", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  if(bookEdited !== ""){
    res.write(`data: ${JSON.stringify({book_edited:bookEdited})}\n\n`);
    bookEdited = ""
  }


  res.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
    res.end();
  });
});


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
  // let io = req.app.get("io");

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
        // router.get("/book-addition-event", async (req, res) => {
        //   res.setHeader("Content-Type", "text/event-stream");
        //   res.setHeader("Cache-Control", "no-cache");
        //   res.setHeader("Access-Control-Allow-Origin", "*");
        //   res.flushHeaders();

        //   const clientId = Date.now();
        //   const newClient = {
        //     id: clientId,
        //     res
        //   };
        //   clients.push(newClient);
          
        //   res.write(`data: ${JSON.stringify(x)}\n\n`);
        //   res.emit('close')
        //   res.on("close", () => {
        //     console.log(`${clientId} Connection closed`);
        //     clients = clients.filter(client => client.id !== clientId);
        //     res.end();
        //   });
        // });
        global.bookAdded = x
        return res.json(x);
      });
      // io.emit("Book Added", newbook);
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
          global.bookEdited = x
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
  if (req.params.token !== "null") {
    console.log(req.params);
    let decode = jwt_decode(req.params.token);
    await book.deleteOne(
      { _id: req.params.id, user_id: decode.id },
      function (err) {
        if (!err) {
          console.log("Deleted");
          return res.status(200).json({});
        } else {
          return res.status(400).json({});
        }
      }
    );
  } else {
    return res.status(401).json({});
  }
});

router.get("/privateBook", async (req, res) => {
  console.log(req.header("Authorization"));
  if (req.header("Authorization") !== "null") {
    let decode = jwt_decode(req.header("Authorization"));
    await book.find({ user_id: decode.id }, function (err, docs) {
      return res.json({ message: "my books", docs });
    });
  } else {
    res.status(404).json({ message: "No Books" });
  }
});
module.exports = router;
