let router = require("express").Router()
let userController = require("../controllers/usersController.js");

router.get("/", (req,res)=>{
    res.json({
        message:"API works",
        version:"1.0"
    })
})

router.route("/users")
    .get(userController.getAll)
    .post(userController.add)

router.route("/users/:user_id")
    .put(userController.update)
    .get(userController.view)

router.route("/users/:user_id/posts")
    .get(userController.getUserSpecificPosts)
    .post(userController.addPost)

module.exports = router;