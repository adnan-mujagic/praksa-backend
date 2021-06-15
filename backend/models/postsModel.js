const mongoose = require("mongoose")


let postSchema = new mongoose.Schema({
    name:String,
    description:String,
    cost:Number,
    state:String,
    created_at:{
        type:Date,
        default:Date.now
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    }
});

let Post = mongoose.model("Post",postSchema);

module.exports = Post;