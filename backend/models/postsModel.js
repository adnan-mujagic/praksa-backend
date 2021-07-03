const mongoose = require("mongoose")


let postSchema = new mongoose.Schema({
    name:String,
    description:String,
    cost:Number,
    state:String,
    quantity: {
        type:Number,
        default:1
    },
    image_url:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20201123/ourlarge/pngtree-isolated-parcel-box-vector-icon-png-image_2463878.jpg"
    },
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