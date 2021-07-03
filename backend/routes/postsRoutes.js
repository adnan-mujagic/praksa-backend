let router = require("express").Router();
let postController = require("../controllers/postsController.js");

router.route("/posts")
    .get(postController.getPosts)


router.route("/posts/:post_id")
    .get(postController.getSinglePost)
    .put(postController.updatePost)

module.exports=router;

