const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Books = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        require: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = book = mongoose.model("Books(from google books api)",Books)