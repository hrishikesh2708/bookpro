const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Books = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = book = mongoose.model("Books(2.0)",Books)