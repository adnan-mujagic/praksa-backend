let router = require("express").Router();
let storeController = require("../controllers/storesController.js")


router.route("/stores/:store_id/posts")
    .get(storeController.getStoreSpecificPosts)
    .post(storeController.addPost)

router.route("/stores")
    .get(storeController.getStores)

router.route("/stores/:store_id")
    .get(storeController.getSingleStore)

module.exports = router;