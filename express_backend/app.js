const express = require("express");
// const http = require("http")
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const cors = require('cors');
const passport = require("passport");
const users = require("./routes/api/users");
const newbook = require("./routes/api/newbooks");
const app = express();
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server,{
//   cors: {
//     origin: "http://localhost:4200",
//     methods: ["GET", "POST","PUT","DELETE"]
//   }
// })

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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
mongoose.set('useFindAndModify', false);




const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api", newbook);
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// app.set("io",io)
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  app.listen(port, () => console.log(`server started on port: ${port}`));
  console.log("MongoDB successfully connected")})
  .catch(err => console.log(err));





