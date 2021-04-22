const express = require("express");
// const axios = require("axios")
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const app = express();
const cors = require('cors');
const passport = require("passport");
const users = require("./routes/api/users");
const books = require("./routes/api/books");
const newbook = require("./routes/api/newbooks");
// const book = require("../../model/newbooks");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
// app.use("/api/books", books);
app.use("/api", newbook);
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  app.listen(port, () => console.log(`server started on port: ${port}`));
  console.log("MongoDB successfully connected")})
  .catch(err => console.log(err));





