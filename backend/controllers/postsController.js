let Post = require("../models/postsModel.js");

module.exports.getPosts = function(req, res){
    Post.find(function (err, posts){
        if(err){
            res.json({
                status:err
            });
        }
        else{
            res.json({
                status:"Success",
                data:posts
            })
        }
    })
}

module.exports.getSinglePost = function(req, res){
    Post.findOne({_id:req.params.post_id}, function(err, post){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            res.json({
                status:"Success",
                data:post
            })
        }
    })
}