const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio:{
    type:String,
    default:""
  },
  following: {
    type: [String]
  },
  followedBy: {
    type: [String]
  },
  image:{
    type:{
        url:String,
        public_id:String
    }
},
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
