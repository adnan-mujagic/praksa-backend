let Post = require("../models/postsModel.js");

module.exports.getPosts = function(req, res){
    Post.find().populate("store").exec(function(err, posts){
        if(err){
            res.json({
                status:err
            })
        }
        res.json({
            status:"Success",
            data:posts
        });
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

module.exports.updatePost = function(req, res){
    Post.findOne({_id:req.params.post_id}, function (err, post){
        if(err){
            res.json(err);
        }
        else{
            post.name = req.body.name ? req.body.name : post.name;
            post.description = req.body.description ? req.body.description : post.description;
            post.cost = req.body.cost ? req.body.cost : post.cost;
            post.state = req.body.state ? req.body.state : post.state;
            post.quantity = req.body.quantity ? req.body.quantity : post.quantity;
            post.image_url = req.body.image_url ? req.body.image_url : post.image_url;
            

            post.save(function(err){
                if(err){
                    res.json({
                        status:err
                    });
                }
                else{
                    res.json({
                        status:"Post update successful",
                        data:post
                    })
                }
            })
        }
    })
}