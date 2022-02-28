const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const postSchema=new Schema({
    user:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    likes:{
        type:[String]
    },
    comments:{
        type:[{
            comment:String,
            commenterName:String,
            commenterId:String,
        }]
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model("posts", postSchema);