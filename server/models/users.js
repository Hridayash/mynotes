const mongoose = require("mongoose");

const  userSchema = new mongoose.Schema({
    title:{
        type:String,
       
    },
   
    post:{
        type: String,
        
    }


});

const noteModel = mongoose.model("users",userSchema);

module.exports = noteModel;