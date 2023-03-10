const Controller = require("../controllers");
const router = require("express").Router();

router.route("/")
    .get(Controller.loginForm)
    .post(Controller.verifyUser)

module.exports = router;