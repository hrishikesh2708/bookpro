const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  authors: {
    type: String,
    required: true
  },  
  title: {
    type: String,
    required: true
  }  
});

module.exports = book = mongoose.model("books", BookSchema);