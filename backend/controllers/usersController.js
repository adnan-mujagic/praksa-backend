let User = require("../models/usersModel")
let Store = require("../models/storesModel");
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
            const old_data = {
                username : user.username,
                password : user.password,
                full_name : user.full_name,
                phone_number : user.phone_number,
                email : user.email,
                image : user.image
            }
            user.username = req.body.username? req.body.username : user.username
            user.password = req.body.password? req.body.password : user.password
            user.full_name = req.body.full_name? req.body.full_name : user.full_name
            user.phone_number = req.body.phone_number? req.body.phone_number : user.phone_number
            user.email = req.body.email? req.body.email: user.email
            user.image = req.body.image? req.body.image: user.image

            if(old_data.username===user.username && old_data.password===user.password && old_data.full_name===user.full_name &&
                old_data.phone_number===user.phone_number && old_data.email===user.email && old_data.image===user.image){
                    res.json({
                        status:"You haven't changed any data!"
                    })
                }

            else if(old_data.username!=user.username){
                checkUniqueUsername(user.username, function(err, usr){
                    if(usr){
                        res.json({
                            status:"Oops, that username is taken, please pick one that isn't!"
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
                                    status:"User updated successfully",
                                    data:user
                                })
                            }
                        })
                    }
                })
            }

            else{
                user.save(function (err){
                    if(err){
                        res.json({
                            status:err
                        })
                    }
                    else{
                        res.json({
                            status:"User updated successfully",
                            data:user
                        })
                    }
                })
            }
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
    if(req.body.image){
        user.image = req.body.image;
    } 
    else{
        user.image = "https://image.flaticon.com/icons/png/512/3135/3135715.png"
    }

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

module.exports.addStore = function(req, res){
    User.findOne({_id:req.params.user_id}, function(err, user){
        if(err){
            res.json({
                status:err,
            })
        }
        else{
            let store = new Store();
            store.name = req.body.name;
            store.location.city = req.body.city;
            store.location.address = req.body.address;
            store.image = req.body.image;
            store.owner = user._id;

            store.save(function(err){
                if(err){
                    res.json({
                        status:err,
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
    })
}

module.exports.getUserSpecificStores = function(req, res){
    Store.find({owner:req.params.user_id},function(err, stores){
        if(err){
            res.json({
                status:err
            })
        }
        else{
            res.json({
                status:"Success",
                data: stores
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