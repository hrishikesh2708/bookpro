const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.get('/', (req, res) => res.send('Hello world!')); 
app.listen(port, () => console.log(`server started on port: ${port}`));




