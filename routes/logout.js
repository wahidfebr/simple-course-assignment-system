const Controller = require("../controllers");
const router = require("express").Router();

router.route("/")
    .get(Controller.logout)

module.exports = router;