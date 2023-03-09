const Controller = require("../controllers");
const router = require("express").Router();

router.route("/")
    .get(Controller.registerForm)
    .post(Controller.createUser)

module.exports = router;