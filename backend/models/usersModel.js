let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username:String,
    password:String,
    full_name:String,
    age:Number,
    phone_number:String,
    email:String,
    image:{
        type:String,
        defaut:"https://publishing.professionalsofthefuture.com/wp-content/uploads/2019/01/user-icon.png"
    },
    role:{
        type:String,
        default:"NORMAL"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    

})

let User = mongoose.model("User",userSchema)

module.exports = User