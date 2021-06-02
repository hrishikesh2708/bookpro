const jwt_decode = require("jwt-decode");
const express = require("express");
const validateBook = require("../../validation/book-add");
const router = express.Router();
const book = require("../../model/newbooks");
const { request, response } = require("express");
const axios = require("axios");
const { findOne } = require("../../model/newbooks");
const user = require("../../model/user");

let authorizedClients = [];
let clients = [];
let changeStream = [];

function streamHandler(request, response) {
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders();
  console.log("client connection request:", request.headers["authorization"]);
  const data = `data: ${JSON.stringify(changeStream)}\n\n`;
  response.write(data);
  const clientId = Date.now();
  if (request.headers["authorization"] !== "null") {
    let decode = jwt_decode(request.headers["authorization"]);
    const newAuthorizedClient = {
      hash: request.headers["tabhash"],
      id: decode.id,
      response,
    };
    authorizedClients.push(newAuthorizedClient);
  } else {
    const newClient = {
      id: clientId,
      response,
    };
    clients.push(newClient);
  }

  const timeHash = setInterval(() => {
    console.log("keepalive");
    response.write(":\n\n");
  }, 40000);

  request.on("close", (e) => {
    if (request.headers.authorization) {
      let decode = jwt_decode(request.headers.authorization);
      authorizedClients = authorizedClients.filter((client) => {
        clearInterval(timeHash);
        return client.id !== decode.id;
      });

      console.log(`${decode.id} Connection closed [auth]`);
    } else {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((client) => client.id !== clientId);
    }
  });
}

async function sendChangeStream(newEvent) {
  // let data = "";
  console.log(Object.keys(newEvent)[0]);
  // await book.watch().on("change", (d) => {
  // console.log(d);
  // data = d;
  // switch (data.operationType) {
  //   case "insert":
  //     console.log("insert");
  //     clients.forEach((client) =>
  //       client.response.write(
  //         `data: ${JSON.stringify({ book_added: data.fullDocument })}\n\n`
  //       )
  //     );
  //     authorizedClients.forEach((client) => {
  //       if (client.id !== data.fullDocument.user_id)
  //         client.response.write(
  //           `data: ${JSON.stringify({ book_added: data.fullDocument })}\n\n`
  //         );
  //     });
  //     break;
  //   case "update":
  //     clients.forEach((client) =>
  //       client.response.write(
  //         `data: ${JSON.stringify({
  //           book_edited: {
  //             _id: data.documentKey._id,
  //             author: data.updateDiscription.updatedFields.author,
  //           },
  //         })}\n\n`
  //       )
  //     );
  //     authorizedClients.forEach((client) => {
  //       // console.log(Object.values(data.updateDescription.updatedFields)[3],"mod user value")
  //       if (client.id !== Object.values(data.updateDescription.updatedFields)[3])
  //         client.response.write(
  //           `data: ${JSON.stringify({
  //             book_edited: {
  //               _id: data.documentKey._id,
  //               author: data.updateDescription.updatedFields.author,
  //             },
  //           })}\n\n`
  //         );
  //     });
  //     break;
  //   case "delete":
  //     clients.forEach((client) =>
  //       client.response.write(
  //         `data: ${JSON.stringify({
  //           book_deleted: {
  //             _id: data.documentKey._id,
  //           },
  //         })}\n\n`
  //       )
  //     );
  //     authorizedClients.forEach((client) => {
  //       if (client.id !== newEvent.id)
  //         client.response.write(
  //           `data: ${JSON.stringify({
  //             book_deleted:data.documentKey._id },
  //           )}\n\n`
  //         );
  //     });
  //     break;
  //   default:
  //     break;
  // }
  // });
  // if (Object.keys(newEvent)[0] !== "private_book") {
  //   authorizedClients.filter((client) => {
  //     if (client.id == newEvent.id)
  //       return client.response.write(`data: ${JSON.stringify(newEvent)}\n\n`);
  //   });
  // }else{
  // console.log(Object.keys(newEvent)[0])
  switch (Object.keys(newEvent)[0]) {
    case "book_added":
      console.log("insert", newEvent);
      clients.forEach((client) =>
        client.response.write(
          `data: ${JSON.stringify({ book_added: data.fullDocument })}\n\n`
        )
      );
      authorizedClients.forEach((client) => {
        if (client.id !== newEvent.id)
          client.response.write(
            `data: ${JSON.stringify({ book_added: newEvent.book_added })}\n\n`
          );
      });
      break;
    case "book_edited":
      clients.forEach((client) =>
        client.response.write(
          `data: ${JSON.stringify({
            book_edited: {
              _id: newEvent.book_edited._id,
              author: newEvent.book_edited.author,
            },
          })}\n\n`
        )
      );
      authorizedClients.forEach((client) => {
        // console.log(Object.values(data.updateDescription.updatedFields)[3],"mod user value")
        if (client.id !== newEvent.id)
          client.response.write(
            `data: ${JSON.stringify({
              book_edited: {
                _id: newEvent.book_edited._id,
                author: newEvent.book_edited.author,
              },
            })}\n\n`
          );
      });
      break;
    case "book_deleted":
      clients.forEach((client) =>
        client.response.write(
          `data: ${JSON.stringify({
            book_deleted: {
              _id: newEvent.book_deleted,
            },
          })}\n\n`
        )
      );
      authorizedClients.forEach((client) => {
        if (client.id !== newEvent.id)
          client.response.write(
            `data: ${JSON.stringify({
              book_deleted: newEvent.book_deleted,
            })}\n\n`
          );
      });
      break;
    case "private_book":
      authorizedClients.filter((client) => {
        if (client.id == newEvent.id)
          return client.response.write(`data: ${JSON.stringify(newEvent)}\n\n`);
      });
      break;
    default:
      break;
  }
  // }
}

router.get("/stream", streamHandler);

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
                genre: response.data.data[i].genre,
                description: response.data.data[i].description,
                image: response.data.data[i].image,
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
  // console.log("get book :" ,req.rawHeaders)
  try {
    const x = await book.find();
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/book-addition", async (req, res) => {
  console.log("request:", req.body, req.header("token"));

  if (req.header("token") !== "null") {
    let decode = jwt_decode(req.header("token"));
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
          user_id: decode.id,
          user_edit: "",
        });
        newbook.save().then((x) => {
          res.json(x);
          return sendChangeStream({ book_added: x, id: decode.id });
        });
      } else {
        return res.status(400).json({ message: "book is already present!" });
      }
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
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
  if (req.header("token") !== "null") {
    let decode = jwt_decode(req.header("token"));
    const client_exist = await user.findOne({ _id: decode.id });
    const x = await book.findOne({ _id: req.body.newData._id });
    if (client_exist !== null) {
      if (x == null) {
        return res.status(400).json({ message: "book is not present!" });
      } else {
        x.author = req.body.newData.author;
        x.user_edit.push(decode.id);
        x.date_edited = Date.now();
        x.save().then((x) => {
          global.bookEdited = x;
          res.json(x);
          return sendChangeStream({ book_edited: x, id: decode.id });
        });
      }
    } else {
      res.status(401).json(req.body.oldData);
    }
  } else {
    res.status(404).json(req.body.oldData);
  }
});
router.delete("/book-delete/:id", async (req, res) => {
  if (req.header("token") !== "null") {
    console.log(req.params);
    let decode = jwt_decode(req.header("token"));
    await book.deleteOne(
      { _id: req.params.id, user_id: decode.id },
      function (err) {
        if (!err) {
          console.log("Deleted");
          global.bookDeleted = req.params.id;
          res.status(200).json({ _id: req.params.id });
          return sendChangeStream({
            book_deleted: req.params.id,
            id: decode.id,
          });
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
  // console.log(req.header("Authorization"));
  if (req.header("Authorization") !== "null") {
    let decode = jwt_decode(req.header("Authorization"));
    await book.find({ user_id: decode.id }, function (err, docs) {
      if (err) {
        res.status(404).json({ message: "No Books" });
      }
      res.json({ message: "my books", docs });
      return sendChangeStream({ private_book: docs, id: decode.id });
    });
  } else {
    res.status(404).json({ message: "No Books" });
  }
});
module.exports = router;
