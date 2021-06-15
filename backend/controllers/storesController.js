let Store = require("../models/storesModel.js");
let Post = require("../models/postsModel.js");

module.exports.getStores = function(req, res){
    Store.find(function(err, stores){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            res.json({
                status:"Success",
                data:stores
            })
        }
    })
}

module.exports.getSingleStore = function (req, res){
    Store.find({_id:req.params.store_id}, function(err, store){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            res.json({
                status:"Success",
                data:store
            })
        }
    })
}

module.exports.addPost = function(req, res){
    Store.findOne({_id:req.params.store_id}, function(err, store){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            let post = new Post();
            post.name = req.body.name;
            post.description = req.body.description;
            post.cost = req.body.cost;
            post.state = req.body.state;
            post.store = store._id;

            post.save(function(err){
                if(err){
                    res.json({
                        status:err,
                    })
                }
                else{
                    res.json({
                        status:"Success",
                        data:post,
                    })
                }
            })
        }
    })
}

module.exports.getStoreSpecificPosts = function(req, res){
    Post.find({store:req.params.store_id}, function(err, posts){
        if(err){
            res.json({
                status:err,
            })
        }else{
            res.json({
                status:"Success",
                data:posts
            })
        }
    })
}