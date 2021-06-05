const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/users");
const newbook = require("./routes/newbooks");
const app = express();

// socket setup
const server = http.createServer(app);

//logger set up
var winston = require("winston"),
  expressWinston = require("express-winston");
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
    expressFormat: true,
    colorize: true,
  })
);
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.REACT_APP_HOME]
  })
);
mongoose.set("useFindAndModify", false);

const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api", newbook);
app.use(express.static(path.join(__dirname , "../react_frontend","/build")));
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(port, () => console.log(`server started on port: ${port}`));
    console.log("MongoDB successfully connected");
  })
  .catch((err) => console.log(err));
