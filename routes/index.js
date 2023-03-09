const Controller = require("../controllers");
const router = require("express").Router();

router.get("/", Controller.home);

module.exports = router;