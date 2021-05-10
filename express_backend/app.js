const express = require("express");
const http = require("http")
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const cors = require('cors');
const passport = require("passport");
const users = require("./routes/api/users");
// const books = require("./routes/api/books");
const newbook = require("./routes/api/newbooks");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
mongoose.set('useFindAndModify', false);
var winston = require('winston'),
    expressWinston = require('express-winston');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    winston.format.align(),
    winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
  expressFormat: true, 
  colorize: true, 
}));



const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
// app.use("/api/books", books);
app.use("/api", newbook);
app.set("socketio",io)
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  app.listen(port, () => console.log(`server started on port: ${port}`));
  console.log("MongoDB successfully connected")})
  .catch(err => console.log(err));





