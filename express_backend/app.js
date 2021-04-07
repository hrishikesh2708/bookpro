const express = require('express');
const connection = require('./config/database');
const app = express();
connection();
app.get('/',(req,res) => res.send("hello world!"));
const port = 4201;
app.listen(port,()=> console.log(`server started on port: ${port}`));