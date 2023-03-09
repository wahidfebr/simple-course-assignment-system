const Controller = require("../controllers");
const router = require("express").Router();

router.route("/")
    .get(Controller.student)

module.exports = router;