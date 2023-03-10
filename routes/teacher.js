const Controller = require("../controllers");
const router = require("express").Router();

router.route("/")
    .get(Controller.teacher)

router.get("/delete-course/:id", Controller.destroyCourse)

module.exports = router;