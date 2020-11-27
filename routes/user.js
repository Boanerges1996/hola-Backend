const router = require("express").Router();
const controlller = require("../controllers/user");

router.post("/register", controlller.createUser);
router.post("/login", controlller.loginUser);

module.exports = router;
