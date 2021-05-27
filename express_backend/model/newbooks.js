const mongoose = require("mongoose")
const db = require("../config/default.json").mongoUri;
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
    user_edit: {
        type: [String],
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    date_edited: {
        type: Date,
        default: Date.now
    }
})

// const customer = new Schema({
//     book_cs : {
//         type: Books,
//         require: true
//     }
// })

module.exports = book = mongoose.model("Books(2.0)",Books)
// module.exports = Customer = mongoose.model("Customer" , customer)

// run().catch(error => console.error(error.stack))

// async function run (){
//     await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     book.collection.watch().stream().on("data" , data => {
//         if(data.operationType !== "update"){
//             return
//         }
//         const { documentKey,updateDiscription } = data
//         const $set = Object.keys(updateDiscription.updateFields).
//             reduce(($set , key) => {
//                 $set[`book.${key}`] = updateDiscription.updateFields[key]
//                 return $set
//             },{})
//             customer.updateMany({'book._id':documentKey._id},{$set}).exec()
//     })
// }