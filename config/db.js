const mongoose = require('mongoose');

const connectDb  = async () =>{
    try{
        const conn = await mongoose.connect( process.env.MONGO_LOCAL_URI );
        console.log(`Mongodb Connected: ${conn.connection.host}`.cyan.underline.bold)
    }catch(e){
        console.error( e.message );
    }

}

module.exports = connectDb;