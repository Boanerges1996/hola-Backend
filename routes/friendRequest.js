const router = require("express").Router();
const controller = require("../controllers/friendRequest");

router.get("/all", controller.getAllFriendRequest);

module.exports = router;
