// const { ReplSet } = require("mongodb-topology-manager");
const mongoose = require("mongoose");

// run().catch((error) => console.error(error));

module.exports =  async function run() {
  console.log(new Date(), "start");
  var uri =
    "mongodb://hrishith27:<password>@bookpro-shard-00-00.ryeec.mongodb.net:27017,bookpro-shard-00-01.ryeec.mongodb.net:27017,bookpro-shard-00-02.ryeec.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pemzib-shard-0&authSource=admin&retryWrites=true&w=majority";
  await mongoose.connect(uri)
  .then(() => {
    console.log("Replica set started...");
  })
  .catch((err) => console.log(err));;
}
