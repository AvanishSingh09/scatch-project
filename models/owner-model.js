const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const userSchema = mongoose.Schema({
    fullname:{
      type: String,
      minLength: 3,
      trim: true,
    }, 
    email: String,
    password: String,
     products: {
        type:Array,
        default: []
    },
     gstin: String,
     picture: String,
})

module.exports = mongoose.model("owner",ownerSchema)