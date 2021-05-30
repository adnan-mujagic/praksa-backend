let User = require("./usersModel")

module.exports.getAll = function(req, res){
    User.find(function (err, users){
        if(err){
            res.json(err);
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
            res.json(err)
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
                        error:err
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
            res.json(err)
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

    user.save(function (err){
        if(err){
            res.json(err);
        }
        else{
            res.json({
                status:"User added successfully",
                data:user
            })
        }
    })
}