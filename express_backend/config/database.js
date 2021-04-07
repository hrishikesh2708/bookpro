const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUri');

const connection = async => {
    try{
        await =  mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDb is live');
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }

};

module.exports = connection;
