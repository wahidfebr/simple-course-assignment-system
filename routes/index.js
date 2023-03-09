const Controller = require("../controllers");
const router = require("express").Router();

const routerLogin = require("./login");
const routerRegister = require("./register");
const routerStudent = require("./student");
const routerTeacher = require("./teacher");


router.get("/", Controller.home);

router.use("/login", routerLogin);
router.use("/register", routerRegister);
router.use("/student", routerStudent);
router.use("/teacher", routerTeacher);

module.exports = router;