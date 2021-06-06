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
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

let Post = mongoose.model("Post",postSchema);

module.exports = Post;