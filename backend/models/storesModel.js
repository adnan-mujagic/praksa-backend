const mongoose = require("mongoose");


let storeSchema = new mongoose.Schema({
    name:String,
    location:{
        city:String,
        address:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

let Store = mongoose.model("Store",storeSchema);

module.exports = Store;