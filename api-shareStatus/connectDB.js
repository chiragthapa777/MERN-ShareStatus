const mongoose=require("mongoose");
require("dotenv").config()
const connectionString=process.env.connection_string;
// const connectionString=process.env.connection_string_local;

const connectMongo=()=>{
    mongoose.connect(connectionString)
    .then(()=>{
        console.log("Connected to database successfully!");
    }).catch((error)=>{
        console.log("Connection to DB failed:",error);
    })
}

module.exports=connectMongo;