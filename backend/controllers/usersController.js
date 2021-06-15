let User = require("../models/usersModel")
let Post = require("../models/postsModel");
const { post } = require("../routes/usersRoutes");
let jwt = require("jsonwebtoken");
let config = require("../../config.js");

function checkUniqueUsername(user, fn){
    User.findOne({username:user},function(err, user1){
        if(user1){
            console.log(JSON.stringify(user1));
            return fn(null, user1);
        }
        else{
            return fn(new Error("OK"))
        }
    })
}

function getJWTToken(user){
    return jwt.sign({
        uid:user._id,
        r:user.role,
        exp:Math.floor(Date.now() / 1000) + (60 * 60)
    },config.JWT_KEY)
    
}

function decodeJTWToken(token){
    return jwt.verify(token, config.JWT_KEY);
}


module.exports.getAll = function(req, res){
    User.find(function (err, users){
        if(err){
            res.json({
                status:err
            });
        }
        else{
            res.json({
                status:"Success",
                data:users
            })
        }
    })
}

module.exports.update = function(req, res){
    User.findOne({_id:req.params.user_id}, function(err, user){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            user.username = req.body.username? req.body.username : user.username
            user.password = req.body.password? req.body.password : user.password
            user.full_name = req.body.full_name? req.body.full_name : user.full_name
            user.phone_number = req.body.phone_number? req.body.phone_number : user.phone_number
            user.email = req.body.email? req.body.email: user.email

            user.save(function (err){
                if(err){
                    res.json({
                        status:err
                    })
                }
                else{
                    res.json({
                        status:"Update successful!",
                        data:user
                    })
                }
            })
        }
    })
}

module.exports.view = function (req, res){
    User.findOne({_id:req.params.user_id}, function(err, user){
        if(err){
            res.json({
                status:err
            })
        }else{
            res.json({
                status:"User found successfully",
                data:user
            })
        }
    })
}

module.exports.add = function(req, res){
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.full_name = req.body.full_name;
    user.phone_number = req.body.phone_number;
    user.email = req.body.email;

    checkUniqueUsername(user.username, function(err, usr){
        if(usr){
            res.json({
                status:"User with that username already exists!"
            })
        }
        else{
            user.save(function (err){
                if(err){
                    res.json({
                        status:err
                    });
                }
                else{
                    res.json({
                        status:"User added successfully",
                        data:user
                    })
                }
            })
        }
    })
}

module.exports.addPost = function(req, res){
    User.findOne({_id:req.params.user_id},function(err, user){
        if(err){
            res.json({
                status:err
            });
        }
        else{
            let post = new Post();
            post.name = req.body.name;
            post.cost = req.body.cost;
            post.state = req.body.state;
            post.description = req.body.description;
            post.created_by = user._id;

            post.save(function (err){
                if(err){
                    res.json({
                        status:err
                    });

                }
                else{
                    res.json({
                        status:"Success",
                        data:post
                    })
                }
            })
        }
    })
}

module.exports.getUserSpecificPosts = function(req,res){
    Post.find({created_by:req.params.user_id})
    .exec(function(err, posts){
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

module.exports.login = function(req, res){
    User.findOne({username:req.body.username}, function(err, user){
        if(err){
            res.json({
                status:"Invalid username!"
            });
        }
        else if(user!=null){
            if(user.password == req.body.password){
                var user_token = getJWTToken(user);
                res.json({
                    status:"Successfully logged in!",
                    token:user_token,
                    data:user,
                })
            }
            else{
                res.json({
                    status:"Wrong password!"
                })
            }
        }
        else{
            res.json({
                status:"Invalid username!"
            })
        }
    })
}