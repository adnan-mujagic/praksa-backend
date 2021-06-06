let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username:String,
    password:String,
    full_name:String,
    age:Number,
    phone_number:String,
    email:String,
    created_at: {
        type: Date,
        default: Date.now
    }
    

})

let User = mongoose.model("User",userSchema)

module.exports = User